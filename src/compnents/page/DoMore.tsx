import React, { useEffect, useMemo, useRef, useState } from "react";
import offline from "../../assets/work.webp";
import productive from "../../assets/productive.webp";
import seamless from "../../assets/seamlessly.webp";

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

export const DoMore = () => {
  const cards: Card[] = useMemo(
    () => [
      {
        image: offline,
        title: "Work, wherever you are",
        heading: "Work, wherever you are",
        body: (
          <>
            View, present or collaborate in Docs on your mobile phone or tablet,
            available in the{" "}
            <a href="#" className="text-[#1a73e8] hover:underline">
              App Store
            </a>{" "}
            <a href="#" className="text-[#1a73e8] hover:underline">
              Play Store
            </a>{" "}
            or connect from your computer.
          </>
        ),
      },
      {
        image: productive,
        title: "Stay productive, even offline",
        heading: "Stay productive, even offline",
        body: (
          <>
            Access, create, and edit documents without any internet connection,
            helping you stay productive anywhere.
          </>
        ),
      },
      {
        image: seamless,
        title: "Seamlessly connect to your other Google apps",
        heading: "Seamlessly connect to your other Google apps",
        body: (
          <>
            Reply to comments directly from Gmail and embed charts from Sheets.
            Search the web and Drive for content, all in Docs.
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
    <section id="customers" className="scroll-mt-24 py-14 sm:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Do more with Google Docs
        </h2>
      </div>

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
