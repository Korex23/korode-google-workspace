import { useEffect, useMemo, useRef, useState } from "react";

type Tab = { id: string; label: string };

export function SectionTabs() {
  const tabs: Tab[] = useMemo(
    () => [
      { id: "gemini", label: "Gemini in Docs" },
      { id: "create", label: "Create" },
      { id: "collaborate", label: "Collaborate" },
      { id: "security", label: "Security" },
      { id: "customers", label: "Customers" },
      { id: "faqs", label: "FAQs" },
    ],
    [],
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string>("gemini");
  const [isSticky, setIsSticky] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setIsSticky(rect.top <= 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("newsletter-footer");
    const sectionEls = tabs
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const headerOffset = 92;
    const observer = new IntersectionObserver(
      (entries) => {
        const footerEntry = entries.find(
          (e) => e.target.id === "newsletter-footer",
        );
        if (footerEntry) {
          setVisible(!footerEntry.isIntersecting);
        }

        const sectionEntries = entries.filter((e) =>
          tabs.some((t) => t.id === e.target.id),
        );

        const best = sectionEntries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (best?.target?.id) setActiveId(best.target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
      },
    );

    sectionEls.forEach((s) => observer.observe(s));
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, [tabs]);

  const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const topOffset = 88;
    const y = target.getBoundingClientRect().top + window.scrollY - topOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative">
      {isSticky && visible && <div className="h-16" />}

      <div
        className={[
          "transition-opacity duration-200 md:block hidden",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
          isSticky ? "fixed right-0 left-0 top-16 z-40" : "sticky top-0 z-20",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 flex justify-center  items-center">
          <div className="py-3">
            <div
              className="
                w-full overflow-x-auto no-scrollbar
              "
            >
              <div
                className="
                  inline-flex items-center gap-2 rounded-full bg-white
                  border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                  px-8 py-2
                "
              >
                {tabs.map((t) => {
                  const active = t.id === activeId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => scrollToId(t.id)}
                      className={[
                        "px-4 py-2 rounded-full text-[15px] font-medium whitespace-nowrap transition",
                        active
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
