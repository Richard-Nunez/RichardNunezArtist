import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/snaps")({
  component: SnapsPage,
  head: () => ({
    meta: [{ title: "Snaps — Richard Nuñez" }],
  }),
});

function SnapsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;

    void video.play().catch((error) => {
      console.log("Video autoplay blocked:", error);
    });
  }, []);

  return (
    <div className="pt-52">
      <header className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="text-sm tracking-[0.3em] text-gilt uppercase">
          Snaps
        </p>

        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          In the room.
        </h1>

        <p className="mt-5 max-w-2xl text-paper-dim">
          Short looks at the work, still on the easel.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-5xl px-5 pb-24 md:px-8">
        <figure>
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="auto"
              className="mx-auto h-auto max-h-[78dvh] w-auto max-w-full bg-ink-2"
              onCanPlay={(e) => {
                e.currentTarget.muted = true;

                void e.currentTarget.play().catch(() => {
                  // Browser may still require interaction.
                });
              }}
              onError={(e) => {
                console.error(
                  "Video failed to load:",
                  e.currentTarget.error,
                );

                setVideoError(true);
              }}
              onVolumeChange={(e) => {
                if (
                  !e.currentTarget.muted &&
                  e.currentTarget.volume > 0
                ) {
                  window.dispatchEvent(
                    new Event("site-audio-pause"),
                  );
                }
              }}
            >
              <source
                src="/videos/east-west.mp4"
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="border border-line bg-ink-2 p-8 text-center">
              <p className="font-display text-2xl text-paper">
                Video could not be loaded.
              </p>

              <p className="mt-3 text-sm text-paper-dim">
                Check that east-west.mp4 exists inside
                public/videos and uses a browser-compatible
                video format.
              </p>
            </div>
          )}

          <figcaption className="mt-5">
            <p className="font-display text-3xl">
              East Coast, West Coast
            </p>

            <p className="mt-2 max-w-xl text-paper-dim">
              Biggie and Tupac. The sides of the canvas read
              East Coast and West Coast.
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}