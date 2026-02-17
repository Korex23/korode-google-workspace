import { useEffect, useMemo, useRef, useState } from "react";
import gemini from "../../assets/gemini_vid.mp4";

const PlayIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path d="M9 7l10 5-10 5V7Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path d="M7 6h3v12H7V6Z" fill="currentColor" />
    <path d="M14 6h3v12h-3V6Z" fill="currentColor" />
  </svg>
);

const Gemini = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const ring = useMemo(() => {
    const r = 16;
    const c = 2 * Math.PI * r;
    return { r, c };
  }, []);

  const stopRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const tick = () => {
    const v = videoRef.current;
    if (!v) return;

    const dur = v.duration || 0;
    const cur = v.currentTime || 0;
    const p = dur > 0 ? cur / dur : 0;

    setProgress(p);

    rafRef.current = requestAnimationFrame(tick);
  };

  const startRaf = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    const tryPlay = async () => {
      try {
        await v.play();
        setIsPlaying(true);
        startRaf();
      } catch {
        setIsPlaying(false);
        stopRaf();
      }
    };

    const onLoaded = () => {
      tryPlay();
    };

    const onPlay = () => {
      setIsPlaying(true);
      startRaf();
    };

    const onPause = () => {
      setIsPlaying(false);
      stopRaf();
    };

    const onEndedOrLoop = () => {
      startRaf();
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEndedOrLoop);

    tryPlay();

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEndedOrLoop);
      stopRaf();
    };
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      try {
        await v.play();
        setIsPlaying(true);
        startRaf();
      } catch {
        // ignore
      }
    } else {
      v.pause();
      setIsPlaying(false);
      stopRaf();
    }
  };

  const dashOffset = ring.c * (1 - progress);

  return (
    <section id="gemini" className="scroll-mt-24">
      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
            <div className="w-full flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative w-full max-w-140 lg:max-w-260">
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={gemini}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="w-full h-auto scale-110 rounded-2xl"
                  />
                </div>

                <div className="pointer-events-none absolute -inset-6 -z-10 blur-2xl opacity-40">
                  <div className="h-full w-full rounded-[32px] bg-gradient-to-br from-blue-100 via-white to-indigo-100" />
                </div>
              </div>
            </div>

            <div className="w-full max-w-xl lg:max-w-none text-center lg:text-start flex flex-col items-center lg:items-start mx-auto order-1 lg:order-2">
              <h1 className="font-medium tracking-tight text-gray-900 text-[24px] leading-[1.15] sm:text-[30px] sm:leading-[1.15] lg:text-[44px] lg:leading-[1.2]">
                Get more done
                <br className="hidden lg:block" />
                with Gemini in Docs
              </h1>

              <p className="mt-6 text-[#5f6368] text-base sm:text-lg leading-relaxed max-w-lg">
                Using a few simple prompts, create professional, stylized, and
                structured documents with images, tables, and more. Get help
                refining your content, see the latest summary of your work, and
                ask questions to improve and finalize your document.{" "}
                <a href="#" className="text-blue-600 underline">
                  Try Google Workspace with Gemini today.
                </a>
              </p>
            </div>
          </div>
          <div className="flex justify-end lg:justify-center items-center mt-10">
            <button
              type="button"
              onClick={togglePlay}
              className="h-14 w-14 rounded-full backdrop-blur border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#1a73e8] transition"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <svg
                className="absolute inset-0"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                <circle
                  cx="20"
                  cy="20"
                  r={ring.r}
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={ring.r}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={ring.c}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 20 20)"
                />
              </svg>

              <span className="relative z-10">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gemini;
