import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  LOVE,
  LOVE_TRACKS,
  RECORD,
  TRACKS,
} from "@/data/site";

const PLAYLIST = [
  ...LOVE_TRACKS.map((track) => ({
    ...track,
    album: LOVE.title,
    cover: LOVE.cover,
  })),

  ...TRACKS.map((track) => ({
    ...track,
    album: RECORD.title,
    cover: RECORD.cover,
  })),
];

export function SiteAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // true = music should be playing
  // false = visitor intentionally paused it
  const wantPlay = useRef(true);

  const mutedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const track = PLAYLIST[index];

  const tryPlay = () => {
    const el = audioRef.current;

    if (!el || !wantPlay.current) return;

    void el
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        // Browser blocked autoplay.
        // We'll try again after the visitor interacts.
        setPlaying(false);
      });
  };

  const go = (dir: -1 | 1) => {
    wantPlay.current = true;

    setIndex(
      (i) =>
        (i + dir + PLAYLIST.length) %
        PLAYLIST.length,
    );
  };

  /*
   * Load the selected track and immediately attempt autoplay.
   */
  useEffect(() => {
    const el = audioRef.current;

    if (!el) return;

    el.src = track.preview;
    el.muted = mutedRef.current;
    el.load();

    tryPlay();
  }, [track.preview]);

  /*
   * Browser fallback:
   * If autoplay was blocked, start on the visitor's first
   * normal click/tap/key press.
   *
   * If the visitor manually paused, wantPlay is false,
   * so normal interaction will NOT restart the music.
   */
  useEffect(() => {
    const resume = (event: Event) => {
      const el = audioRef.current;

      if (!el || !wantPlay.current || !el.paused) {
        return;
      }

      // Don't intercept clicks on the music-player controls.
      const target = event.target as HTMLElement | null;

      if (target?.closest("[data-site-audio-control]")) {
        return;
      }

      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    /*
     * Album previews / Snaps videos can dispatch this event
     * so two pieces of audio don't play at once.
     */
    const pauseForOtherMedia = () => {
      wantPlay.current = false;

      const el = audioRef.current;

      if (el) {
        el.pause();
      }

      setPlaying(false);
    };

    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);

    window.addEventListener(
      "site-audio-pause",
      pauseForOtherMedia,
    );

    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);

      window.removeEventListener(
        "site-audio-pause",
        pauseForOtherMedia,
      );
    };
  }, []);

  const togglePlay = () => {
    const el = audioRef.current;

    if (!el) return;

    if (!el.paused) {
      // User manually paused the music.
      wantPlay.current = false;

      el.pause();
      setPlaying(false);

      return;
    }

    // User manually pressed Play.
    wantPlay.current = true;

    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const toggleMute = () => {
    const el = audioRef.current;

    if (!el) return;

    const next = !mutedRef.current;

    mutedRef.current = next;
    setMuted(next);

    el.muted = next;
  };

  return (
    <div className="fixed right-3 bottom-3 z-40 flex items-center gap-1 border border-line bg-ink/90 px-1.5 py-1 backdrop-blur-md md:right-5 md:bottom-5">
      <audio
        ref={audioRef}
        autoPlay
        playsInline
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => go(1)}
      />

      <img
        src={track.cover}
        alt=""
        className="size-8 shrink-0 border border-gilt/40 object-cover"
      />

      <div className="hidden max-w-36 px-1 sm:block">
        <p className="truncate font-display text-sm">
          {track.title}
        </p>

        <p className="truncate text-[9px] tracking-[0.12em] text-paper/50 uppercase">
          {track.album}
        </p>
      </div>

      <button
        type="button"
        data-site-audio-control
        className="flex size-8 items-center justify-center text-paper"
        aria-label="Previous track"
        onClick={() => go(-1)}
      >
        <SkipBack className="size-3.5" />
      </button>

      <button
        type="button"
        data-site-audio-control
        className="flex size-8 items-center justify-center bg-gilt text-ink"
        aria-label={playing ? "Pause" : "Play"}
        onClick={togglePlay}
      >
        {playing ? (
          <Pause className="size-3.5" />
        ) : (
          <Play className="size-3.5 translate-x-px" />
        )}
      </button>

      <button
        type="button"
        data-site-audio-control
        className="flex size-8 items-center justify-center text-paper"
        aria-label="Next track"
        onClick={() => go(1)}
      >
        <SkipForward className="size-3.5" />
      </button>

      <button
        type="button"
        data-site-audio-control
        className="flex size-8 items-center justify-center text-paper"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={toggleMute}
      >
        {muted ? (
          <VolumeX className="size-3.5" />
        ) : (
          <Volume2 className="size-3.5" />
        )}
      </button>
    </div>
  );
}