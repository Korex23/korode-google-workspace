import React, { useEffect, useMemo, useRef, useState } from "react";
import capture from "../../assets/capture.webp";
import streamline from "../../assets/streamline.webp";
import custom from "../../assets/capture.webp";
import FeatureTabsWithImage from "./Coll";

type Card = {
  image: string;
  title: string;
  heading: string;
  body: React.ReactNode;
};

function useSlidesPerView() {
  const [spv, setSpv] = useState(1);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) return setSpv(3);
      if (w >= 768) return setSpv(2);
      return setSpv(1);
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  return spv;
}

const Dot = ({ active }: { active: boolean }) => (
  <span
    className={[
      "inline-block h-2 w-2 rounded-full transition",
      active ? "bg-gray-600" : "bg-gray-300",
    ].join(" ")}
  />
);

export const Collaborate = () => {
  const cards: Card[] = useMemo(
    () => [
      {
        image: capture,
        title: "Capture meeting notes with ease and speed",
        heading: "Capture meeting notes with ease and speed",
        body: (
          <>
            Draft polished, structured meeting notes with event details straight
            from a{" "}
            <a href="#" className="text-[#1a73e8] hover:underline">
              Google Calendar
            </a>{" "}
            event using the meeting notes building block in Docs.
          </>
        ),
      },
      {
        image: streamline,
        title: "Streamline your workflows with electronic signatures",
        heading: "Streamline your workflows with electronic signatures",
        body: (
          <>
            Draft agreements, request signatures, and manage contract templates
            all in one place with{" "}
            <a href="#" className="text-[#1a73e8] hover:underline">
              eSignature
            </a>{" "}
            in Docs.
          </>
        ),
      },
      {
        image: custom,
        title: "Save time by easily adding content you reuse often",
        heading: "Save time by easily adding content you reuse often",
        body: (
          <>
            Create a custom building block for pieces of text like a bio,
            signature, address, and more – simply type ‘@’ to insert instead of
            endlessly copying and pasting the same content.
          </>
        ),
      },
    ],
    [],
  );

  const slidesPerView = useSlidesPerView();
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.max(1, Math.ceil(cards.length / slidesPerView));

  useEffect(() => {
    setPage(0);
  }, [slidesPerView]);

  const goTo = (p: number) => {
    const next = Math.min(Math.max(p, 0), totalPages - 1);
    setPage(next);
  };

  const onTouch = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    onTouch.current = { x: t.clientX, y: t.clientY, active: true };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!onTouch.current.active) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - onTouch.current.x;
    const dy = t.clientY - onTouch.current.y;

    onTouch.current.active = false;

    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) goTo(page + 1);
    else goTo(page - 1);
  };

  return (
    <section id="collaborate" className="scroll-mt-24 pb-10">
      <FeatureTabsWithImage />
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Accelerate everyday tasks
        </h2>
        <p className="mt-3 text-gray-600 text-base sm:text-lg">
          Get more done without having to leave Docs.
        </p>
      </div>

      {/* Cards / Carousel */}
      <div className="mt-10">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${page * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              const start = pageIndex * slidesPerView;
              const pageCards = cards.slice(start, start + slidesPerView);

              return (
                <div
                  key={pageIndex}
                  className="w-full shrink-0"
                  style={{ width: "100%" }}
                >
                  <div
                    className={[
                      "grid gap-8",
                      slidesPerView === 3
                        ? "grid-cols-3"
                        : slidesPerView === 2
                          ? "grid-cols-2"
                          : "grid-cols-1",
                    ].join(" ")}
                  >
                    {pageCards.map((c) => (
                      <article key={c.title} className="text-center">
                        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-auto"
                          />
                        </div>

                        <h3 className="mt-8 text-2xl font-semibold text-gray-900 leading-snug">
                          {c.heading}
                        </h3>

                        <p className="mt-4 text-gray-600 leading-relaxed max-w-sm mx-auto">
                          {c.body}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots (only show when carousel is needed: < xl) */}
        <div className="mt-8 flex justify-center gap-3 xl:hidden">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="p-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <Dot active={i === page} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
