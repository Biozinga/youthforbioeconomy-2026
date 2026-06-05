// Directive Next.js: ce composant pilote une vidéo côté client.
'use client';

// Import des hooks React pour piloter la lecture inversée de la vidéo.
import { useCallback, useEffect, useRef, useState } from 'react';
// Import du hook qui déclenche la vidéo uniquement quand la section est visible.
import { useInView } from '@/hooks/useInView';

const VIDEO_OUTRO_LEAD_SECONDS = 3;

/**
 * Composant Hero - Section d'accueil principale avec présentation de la plateforme
 * Affiche le texte de marque et une vidéo de présentation lue à rebours
 */
export function Hero() {
  // Observe la section pour ne lancer la vidéo que lorsque le hero est visible.
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.28 });
  // Référence vers la vidéo du hero pour pouvoir la lire à rebours.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoOutroVisible, setIsVideoOutroVisible] = useState(false);
  const videoOutroVisibleRef = useRef(false);
  // Empêche la vidéo de repartir à chaque entrée/sortie du viewport.
  const hasPlayedVideoRef = useRef(false);
  // Nettoie une lecture inversée en cours, y compris un éventuel listener metadata.
  const reversePlaybackCleanupRef = useRef<(() => void) | null>(null);

  // Met à jour l'overlay sans déclencher un rendu à chaque frame.
  const updateVideoOutroVisibility = useCallback((isVisible: boolean) => {
    if (videoOutroVisibleRef.current === isVisible) {
      return;
    }

    videoOutroVisibleRef.current = isVisible;
    setIsVideoOutroVisible(isVisible);
  }, []);

  // Arrête proprement toute lecture inversée déjà en cours.
  const stopReversePlayback = useCallback(() => {
    reversePlaybackCleanupRef.current?.();
    reversePlaybackCleanupRef.current = null;
  }, []);

  // Lit la vidéo à rebours, sans son, puis la laisse arrêtée au début.
  const playReverseVideo = useCallback(
    (forceReplay = false) => {
      // Garde une seule lecture par affichage, sauf lorsque la page est rechargée/restaurée.
      if (!forceReplay && hasPlayedVideoRef.current) {
        return;
      }

      // Récupère l'élément vidéo.
      const video = videoRef.current;

      if (!video) {
        return;
      }

      // Coupe toute lecture précédente avant de repartir proprement.
      stopReversePlayback();

      // Identifiant de frame conservé pour nettoyer l'animation.
      let frameId = 0;
      // Empêche les callbacks tardifs de modifier une vidéo démontée.
      let isCancelled = false;
      // Dernier moment où un seek a été appliqué, pour limiter le travail du navigateur.
      let lastSeekAt = 0;

      // Démarre la lecture inversée dès que la durée réelle est connue.
      const startReversePlayback = () => {
        if (isCancelled || !Number.isFinite(video.duration) || video.duration <= 0) {
          return;
        }

        // Marque la vidéo comme jouée avant la boucle pour éviter tout redémarrage au scroll.
        hasPlayedVideoRef.current = true;
        // Cache le titre au démarrage pour le faire apparaître uniquement en fin de vidéo.
        updateVideoOutroVisibility(false);
        // Garantit une lecture silencieuse quel que soit l'encodage d'origine.
        video.muted = true;
        // Le navigateur ne sait pas lire proprement un MP4 en négatif, on pilote donc les frames.
        video.pause();
        video.currentTime = video.duration;

        // Point de départ de l'animation inversée.
        const startedAt = performance.now();

        const renderFrame = (now: number) => {
          if (isCancelled) {
            return;
          }

          // Convertit le temps écoulé en position vidéo décroissante.
          const elapsedSeconds = (now - startedAt) / 1000;
          const nextTime = Math.max(0, video.duration - elapsedSeconds);
          const shouldRevealOutro =
            elapsedSeconds >= Math.max(0, video.duration - VIDEO_OUTRO_LEAD_SECONDS);

          updateVideoOutroVisibility(shouldRevealOutro || nextTime === 0);

          // Cherche environ 24 fois par seconde pour éviter une surcharge inutile.
          if (now - lastSeekAt >= 1000 / 24 || nextTime === 0) {
            video.currentTime = nextTime;
            lastSeekAt = now;
          }

          if (nextTime > 0) {
            frameId = requestAnimationFrame(renderFrame);
            return;
          }

          // Arrête la vidéo à sa fin logique, ici le début du fichier lu à rebours.
          video.currentTime = 0;
          video.pause();
          reversePlaybackCleanupRef.current = null;
        };

        frameId = requestAnimationFrame(renderFrame);
      };

      reversePlaybackCleanupRef.current = () => {
        isCancelled = true;
        cancelAnimationFrame(frameId);
        video.removeEventListener('loadedmetadata', startReversePlayback);
      };

      if (video.readyState >= 1) {
        startReversePlayback();
      } else {
        video.addEventListener('loadedmetadata', startReversePlayback, { once: true });
      }
    },
    [stopReversePlayback, updateVideoOutroVisibility]
  );

  // Lance la vidéo lorsque le hero devient visible.
  useEffect(() => {
    if (!isInView) {
      return;
    }

    playReverseVideo();

    return stopReversePlayback;
  }, [isInView, playReverseVideo, stopReversePlayback]);

  // Relance la vidéo après un rechargement ou une restauration depuis le cache navigateur.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      const [navigationEntry] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[];
      const isReload = navigationEntry?.type === 'reload';

      if (!event.persisted && !isReload) {
        return;
      }

      hasPlayedVideoRef.current = false;

      if (isInView) {
        playReverseVideo(true);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [isInView, playReverseVideo]);

  // Retourne la section hero complète avec texte et vidéo.
  return (
    <>
      {/* Première section dédiée uniquement à la vidéo. */}
      <section
        id="top"
        className={`hero-video-intro ${isInView ? 'is-in-view' : ''}`}
        ref={ref}
        aria-label="Vidéo Pure Graine"
      >
        <video
          ref={videoRef}
          className="hero-video-fullscreen"
          src="/videos/short_cut.mp4"
          muted
          playsInline
          preload="auto"
          aria-label="Vidéo Pure Graine lue à rebours"
        />
        <div
          className={`hero-video-outro ${isVideoOutroVisible ? 'is-visible' : ''}`}
          aria-hidden={!isVideoOutroVisible}
        >
          <h1 className="hero-video-outro-title">
            <span className="hero-title-main">Pure Graine</span>
            <span className="hero-title-secondary">détecte la zéaralénone dans les céréales.</span>
          </h1>
        </div>
      </section>

      {/* Deuxième section: promesse Pure Graine sur fond de champ. */}
      <section className="hero hero-brand-section is-in-view">
        <div className="container hero-content hero-brand-content">
          <div className="hero-text">
            <h1>
              <span className="hero-title-main">Pure Graine</span>
              <span className="hero-title-secondary">
                détecte la zéaralénone dans les céréales.
              </span>
            </h1>
            <p className="hero-subtitle">
              Un projet iGEM Sorbonne Université conçu pour identifier rapidement ZEN ou sa source :
              aptamère Z0/Z1, toehold switch fluorescent, aptazyme et LAMP ciblant Fusarium.
            </p>
            <div className="hero-features" aria-label="Impacts principaux de la solution">
              <span>Aptamère Z0/Z1</span>
              <span>Signal mNeonGreen</span>
              <span>Fusarium ciblé</span>
            </div>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="#prediction-map">
                Tester notre modèle de prédiction
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
