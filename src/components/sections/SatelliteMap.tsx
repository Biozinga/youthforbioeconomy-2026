'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TILE_SIZE = 256;
const MIN_ZOOM = 5;
const MAX_ZOOM = 8;
const INITIAL_VIEW = {
  lat: 46.45,
  lng: 2.25,
  zoom: 6,
};

type View = typeof INITIAL_VIEW;

export type MapLocation = {
  lat: number;
  lng: number;
};

type DragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startWorldX: number;
  startWorldY: number;
  zoom: number;
};

type SatelliteMapProps = {
  selectedLocation?: MapLocation | null;
  onLocationSelect?: (location: MapLocation) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function wrapTileX(x: number, zoom: number) {
  const count = 2 ** zoom;
  return ((x % count) + count) % count;
}

function project(lat: number, lng: number, zoom: number) {
  const safeLat = clamp(lat, -85.05112878, 85.05112878);
  const sinLat = Math.sin((safeLat * Math.PI) / 180);
  const scale = TILE_SIZE * 2 ** zoom;

  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale,
  };
}

function unproject(x: number, y: number, zoom: number) {
  const scale = TILE_SIZE * 2 ** zoom;
  const normalizedY = clamp(y, 0, scale);
  const lng = (x / scale) * 360 - 180;
  const mercator = Math.PI - (2 * Math.PI * normalizedY) / scale;
  const lat = (180 / Math.PI) * Math.atan(Math.sinh(mercator));

  return {
    lat: clamp(lat, -85.05112878, 85.05112878),
    lng,
  };
}

function tileUrl(zoom: number, x: number, y: number) {
  return `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2021_3857/default/g/${zoom}/${y}/${x}.jpg`;
}

export function SatelliteMap({ selectedLocation = null, onLocationSelect }: SatelliteMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingViewRef = useRef<View | null>(null);
  const [view, setView] = useState<View>(INITIAL_VIEW);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = mapRef.current;

    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scheduleView = useCallback((nextView: View) => {
    pendingViewRef.current = nextView;

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;

      if (pendingViewRef.current) {
        setView(pendingViewRef.current);
      }
    });
  }, []);

  const geometry = useMemo(() => {
    const width = Math.max(size.width, 1);
    const height = Math.max(size.height, 1);
    const center = project(view.lat, view.lng, view.zoom);
    const topLeft = {
      x: center.x - width / 2,
      y: center.y - height / 2,
    };
    const minTileX = Math.floor(topLeft.x / TILE_SIZE) - 1;
    const maxTileX = Math.floor((topLeft.x + width) / TILE_SIZE) + 1;
    const minTileY = Math.max(0, Math.floor(topLeft.y / TILE_SIZE) - 1);
    const maxTileY = Math.min(2 ** view.zoom - 1, Math.floor((topLeft.y + height) / TILE_SIZE) + 1);
    const tiles = [];

    for (let y = minTileY; y <= maxTileY; y += 1) {
      for (let x = minTileX; x <= maxTileX; x += 1) {
        const tileX = wrapTileX(x, view.zoom);

        tiles.push({
          key: `${view.zoom}-${x}-${y}`,
          src: tileUrl(view.zoom, tileX, y),
          left: x * TILE_SIZE - topLeft.x,
          top: y * TILE_SIZE - topLeft.y,
        });
      }
    }

    const selectedMarker = selectedLocation
      ? {
          ...selectedLocation,
          ...(() => {
            const point = project(selectedLocation.lat, selectedLocation.lng, view.zoom);

            return {
              left: point.x - topLeft.x,
              top: point.y - topLeft.y,
            };
          })(),
        }
      : null;

    return { tiles, selectedMarker };
  }, [selectedLocation, size.height, size.width, view.lat, view.lng, view.zoom]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const center = project(view.lat, view.lng, view.zoom);
      dragRef.current = {
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startWorldX: center.x,
        startWorldY: center.y,
        zoom: view.zoom,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    },
    [view.lat, view.lng, view.zoom]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (!drag) {
        return;
      }

      const next = unproject(
        drag.startWorldX - (event.clientX - drag.startClientX),
        drag.startWorldY - (event.clientY - drag.startClientY),
        drag.zoom
      );

      scheduleView({ ...next, zoom: drag.zoom });
    },
    [scheduleView]
  );

  const stopDragging = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (drag?.pointerId === event.pointerId) {
        const movedDistance = Math.hypot(
          event.clientX - drag.startClientX,
          event.clientY - drag.startClientY
        );

        if (event.type === 'pointerup' && movedDistance < 6 && onLocationSelect && mapRef.current) {
          const rect = mapRef.current.getBoundingClientRect();
          const center = project(view.lat, view.lng, view.zoom);
          const topLeft = {
            x: center.x - Math.max(size.width, 1) / 2,
            y: center.y - Math.max(size.height, 1) / 2,
          };
          const location = unproject(
            topLeft.x + event.clientX - rect.left,
            topLeft.y + event.clientY - rect.top,
            view.zoom
          );

          onLocationSelect({
            lat: Number(location.lat.toFixed(5)),
            lng: Number(location.lng.toFixed(5)),
          });
        }

        dragRef.current = null;
        setIsDragging(false);
      }
    },
    [onLocationSelect, size.height, size.width, view.lat, view.lng, view.zoom]
  );

  const zoomBy = useCallback((delta: number) => {
    setView((current) => ({
      ...current,
      zoom: clamp(current.zoom + delta, MIN_ZOOM, MAX_ZOOM),
    }));
  }, []);

  return (
    <div
      ref={mapRef}
      className={`satellite-map${isDragging ? ' satellite-map-dragging' : ''}`}
      role="img"
      aria-label="Vue satellite interactive de territoires céréaliers"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={() => {
        dragRef.current = null;
        setIsDragging(false);
      }}
    >
      <div className="satellite-map-tile-layer" aria-hidden="true">
        {geometry.tiles.map((tile) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={tile.key}
            className="satellite-map-tile"
            src={tile.src}
            alt=""
            draggable={false}
            decoding="async"
            style={{
              transform: `translate3d(${tile.left}px, ${tile.top}px, 0)`,
            }}
          />
        ))}
      </div>

      {geometry.selectedMarker && (
        <span
          className="satellite-map-selected-pin"
          aria-hidden="true"
          style={{
            left: `${geometry.selectedMarker.left}px`,
            top: `${geometry.selectedMarker.top}px`,
          }}
        />
      )}

      <div className="satellite-map-controls" onPointerDown={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Zoom avant" onClick={() => zoomBy(1)}>
          +
        </button>
        <button type="button" aria-label="Zoom arrière" onClick={() => zoomBy(-1)}>
          -
        </button>
      </div>
    </div>
  );
}
