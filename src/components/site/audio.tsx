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
  const wantPlay = useRef(true);
  const mutedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const track = PLAYLIST[index];

  const go = (dir: -1 | 1) => {
    wantPlay.current = true;

    setIndex(
      (i) =>
        (i + dir + PLAYLIST.length) %
        PLAYLIST.length,
    );
  };

  useEffect(() => {
    const el = audioRef.current;

    if (!el) return;

    el.src = track.preview;
    el.muted = mutedRef.current;
    el.load();

    if (!wantPlay.current) return;

    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [track.preview]);

  useEffect(() => {
    const onPause = () => {
      wantPlay.current = false;

      audioRef.current?.pause();
      setPlaying(false);
    };

    const resume = () => {
      const el = audioRef.current;

      if (
        !el ||
        !wantPlay.current ||
        !el.paused ||
        mutedRef.current
      ) {
        return;
      }

      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    window.addEventListener(
      "site-audio-pause",
      onPause,
    );

    window.addEventListener(
      "pointerdown",
      resume,
    );

    return () => {
      window.removeEventListener(
        "site-audio-pause",
        onPause,
      );

      window.removeEventListener(
        "pointerdown",
        resume,
      );
    };
  }, []);

  const togglePlay = () => {
    const el = audioRef.current;

    if (!el) return;

    if (playing) {
      wantPlay.current = false;

      el.pause();
      setPlaying(false);

      return;
    }

    wantPlay.current = true;

    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const toggleMute = () => {
    const next = !mutedRef.current;

    mutedRef.current = next;
    setMuted(next);

    if (audioRef.current) {
      audioRef.current.muted = next;
    }

    if (!next && !playing) {
      wantPlay.current = true;

      void audioRef.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <div className="fixed right-3 bottom-3 z-40 flex items-center gap-1 border border-line bg-ink/90 px-1.5 py-1 backdrop-blur-md md:right-5 md:bottom-5">
      <audio
        ref={audioRef}
        preload="auto"
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
        className="flex size-8 items-center justify-center text-paper"
        aria-label="Previous track"
        onClick={() => go(-1)}
      >
        <SkipBack className="size-3.5" />
      </button>

      <button
        type="button"
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
        className="flex size-8 items-center justify-center text-paper"
        aria-label="Next track"
        onClick={() => go(1)}
      >
        <SkipForward className="size-3.5" />
      </button>

      <button
        type="button"
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