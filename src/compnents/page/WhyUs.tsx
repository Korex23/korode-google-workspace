import { useEffect, useMemo, useState } from "react";
import equifax from "../../assets/equifax.webp";
import novapost from "../../assets/novaPost.webp";
import finquery from "../../assets/finQuery.webp";
import thoughtworks from "../../assets/thoughWorks.svg";
import webMd from "../../assets/webFx.webp";
import { MoveLeft, MoveRight } from "lucide-react";

type CarouselItem = {
  id: string;
  logoText: string; // swap for an <img /> if you have a logo
  quote: string;
  author: string;
};

export default function OrgDocsCarousel() {
  const items: CarouselItem[] = useMemo(
    () => [
      {
        id: "equifax",
        logoText: equifax,
        quote:
          "We've completely eliminated concerns over version control and document sharing because we're more certain about who has access to share what and when, all while still being productive.",
        author:
          "JK Krug, Vice President of Digital Employee Experience, Equifax",
      },
      {
        id: "novapost",
        logoText: novapost,
        quote:
          "Google Docs is such a convenient tool for international communication. I wrote a press release to share with my team and asked them to make suggestions. The ability to track their edits, accept, reject, or reopen their comments gives me the flexibility I need.",
        author:
          "Olha Baburina, External International Communications Manager, Nova Post",
      },
      {
        id: "finquery",
        logoText: finquery,
        quote:
          "Google Workspace with Gemini is becoming a part of our way of life. I personally leveraged Gemini in Google Docs to create a one-page summary of observability and monitoring tools. What Gemini gave me was CTO Ready. The time I get back from Gemini helps me spend more focus hours doing the things that really need my attention..",
        author:
          "Amanda Taylor, Former Vice President of Infrastructure, FinQuery",
      },
      {
        id: "thoughtworks",
        logoText: thoughtworks,
        quote:
          "As a non-native English speaker, I’ve used the Help me write prompt in Gemini to deliver more polished written content, such as blogs and emails, faster. I create drafts in Docs and prompt Gemini to improve the grammar and phrasing, then make adjustments to shorten the text and customize the tone to be more formal or casual.",
        author: "Jessie Xia, Global Chief Information Officer, Thoughtworks",
      },
      {
        id: "webfx",
        logoText: webMd,
        quote:
          "Our client-facing teams use the Help me write feature in Docs to generate ideas and develop outlines. The Shorten feature within Docs, for example, helps with our everyday client-facing messaging. Our clients are busy and we aim for their interactions with us to be the easiest part of their day, which starts with clear and concise communication.",
        author: "Catelin Carey, Senior Vice President, WebFX",
      },
    ],
    [],
  );

  const [active, setActive] = useState(0);

  const go = (dir: -1 | 1) => {
    setActive((prev) => (prev + dir + items.length) % items.length);
  };

  // Optional: keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [items.length]);

  // Optional: auto-play (comment out if you don't want it)
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);

  const current = items[active];

  return (
    <section className="w-full bg-[#f7f7f7] py-6 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-[24px] md:text-[30px] font-medium tracking-tight text-gray-900">
          Learn why organizations use Docs
        </h2>

        <div className="relative mt-10 md:mt-14">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-black/5 hover:bg-white transition"
          >
            <MoveLeft size={20} className="text-gray-600" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-black/5 hover:bg-white transition"
          >
            <MoveRight size={20} className="text-gray-600" />
          </button>

          <div className="mx-auto max-w-4xl px-0 md:px-20">
            <div
              key={current.id}
              className="flex flex-col items-center text-center"
            >
              <div className="mt-4 md:mt-2 select-none">
                <img src={current.logoText} alt={current.id} width={120} />
              </div>

              <p className="mt-5 text-md md:text-lg leading-relaxed text-gray-800 font-medium">
                “{current.quote}”
              </p>

              <p className="mt-6 text-xs md:text-sm text-gray-500">
                {current.author}
              </p>

              <button
                type="button"
                className="mt-10 inline-flex items-center justify-center rounded-full border border-gray-300 text-xs bg-white px-7 py-3 text-[#1a73e8] font-medium hover:bg-gray-50 transition"
              >
                Learn more
              </button>

              <div className="mt-12 flex items-center justify-center gap-4">
                {items.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setActive(i)}
                      className={[
                        "h-1.5 w-1.5 rounded-full transition",
                        isActive ? "bg-gray-700" : "bg-gray-400/60",
                      ].join(" ")}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
