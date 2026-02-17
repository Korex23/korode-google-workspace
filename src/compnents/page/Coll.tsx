import { useMemo, useState } from "react";
import meet from "../../assets/meet.webp";
import control from "../../assets/control.webp";
import collab from "../../assets/collab.webp";
import review from "../../assets/review.webp";
import { Medal } from "lucide-react";

type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isPremium?: boolean;
};

export default function FeatureTabsWithImage() {
  const FEATURES: Feature[] = useMemo(
    () => [
      {
        id: "meet",
        label: "Meet directly in your documents",
        title: "Meet directly in your documents",
        description:
          "Collaborate in context by meeting in Google Docs, Sheets, or Slides.",
        imageSrc: meet,
        imageAlt: "Meet in Docs UI",
        isPremium: true,
      },
      {
        id: "access",
        label: "Control access to your documents",
        title: "Control access to your documents",
        description:
          "Use comments and emojis to give feedback to your teams and assign tasks to keep projects moving forward, without ever leaving your document.",
        imageSrc: control,
        imageAlt: "Sharing permissions UI",
      },
      {
        id: "collab",
        label:
          "Collaborate with your partners and make decisions, all in one place",
        title:
          "Collaborate with your partners and make decisions, all in one place",
        description:
          "You and your stakeholders can reference previous versions of a document at any time and reinstate them.",
        imageSrc: collab,
        imageAlt: "Collaboration UI",
      },
      {
        id: "versions",
        label: "Review changes with flexibility",
        title: "Review changes with flexibility",
        description:
          "You and your stakeholders can reference previous versions of a document at any time and reinstate them.",
        imageSrc: review,
        imageAlt: "Version history UI",
      },
    ],
    [],
  );

  const [activeId, setActiveId] = useState(FEATURES[0]?.id);

  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section className="mb-20" id="collaborate">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Collaborate on and refine your document, from anywhere
        </h2>
        <p className="mt-3 text-gray-600 text-base sm:text-lg">
          Stay in sync with edits and comments from internal and external teams
          on your phone, tablet, or web browser.
        </p>
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-stretch">
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden object-cover">
              <img
                src={active.imageSrc}
                alt={active.imageAlt}
                className="w-full h-auto object-cover"
                draggable={false}
              />
            </div>
          </div>

          <div className="w-full">
            <div>
              {FEATURES.map((f) => {
                const isActive = f.id === activeId;

                return (
                  <div key={f.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveId(f.id)}
                      className="w-full text-left py-3 lg:py-5 flex items-center gap-6"
                      aria-expanded={isActive}
                      aria-controls={`panel-${f.id}`}
                    >
                      <span
                        className={[
                          "self-stretch w-[3.5px] rounded-md",
                          isActive ? "bg-[#1a73e8]" : "bg-gray-200",
                        ].join(" ")}
                        aria-hidden="true"
                      />

                      <div className="flex-1">
                        <div
                          className={[
                            "text-[16px] sm:text-[20px] leading-snug",
                            isActive
                              ? "text-gray-900 font-semibold"
                              : "text-gray-600 font-medium",
                          ].join(" ")}
                        >
                          {f.label}
                        </div>

                        <div
                          className={[
                            "mt-1 text-[16px] leading-relaxed",
                            isActive
                              ? "text-gray-600"
                              : "text-transparent select-none h-0 overflow-hidden",
                          ].join(" ")}
                        >
                          {f.isPremium && (
                            <div className="flex gap-1 items-center mb-3">
                              <div className="bg-[#1a73e8]/20 text-[#1a73e8] rounded-full w-fit px-5 py-1 flex text-xs items-center gap-1">
                                <img
                                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-7LhoZoRSU32Sn20yI8213k-92d83d07ba564bddac887d329c3589c2-Vector.svg"
                                  alt="award"
                                  width="12"
                                  height="15"
                                  loading="lazy"
                                />
                                Premium Feature
                              </div>
                              <svg
                                version="1.2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                              >
                                <style></style>
                                <path
                                  fill="#1a73e8"
                                  fill-rule="evenodd"
                                  d="m8 14.7q-1.4 0-2.6-0.6-1.2-0.5-2.1-1.4-0.9-0.9-1.4-2.1-0.6-1.2-0.6-2.6 0-1.4 0.6-2.6 0.5-1.2 1.4-2.1 0.9-0.9 2.1-1.4 1.2-0.6 2.6-0.6 1.4 0 2.6 0.6 1.2 0.5 2.1 1.4 0.9 0.9 1.4 2.1 0.6 1.2 0.6 2.6 0 1.4-0.6 2.6-0.5 1.2-1.4 2.1-0.9 0.9-2.1 1.4-1.2 0.6-2.6 0.6zm0-1.4q2.2 0 3.8-1.5 1.5-1.6 1.5-3.8 0-2.2-1.5-3.8-1.6-1.5-3.8-1.5-2.2 0-3.8 1.5-1.5 1.6-1.5 3.8 0 2.2 1.5 3.8 1.6 1.5 3.8 1.5zm-0.7-6h1.4v4h-1.4zm0.2-1.5q-0.2-0.2-0.2-0.5 0-0.3 0.2-0.4 0.2-0.2 0.5-0.2 0.3 0 0.5 0.2 0.2 0.1 0.2 0.4 0 0.3-0.2 0.5-0.2 0.2-0.5 0.2-0.3 0-0.5-0.2z"
                                ></path>
                              </svg>
                            </div>
                          )}

                          {isActive ? f.description : null}
                        </div>
                      </div>
                    </button>

                    {/* MOBILE: accordion panel (image + text under the row) */}
                    <div
                      id={`panel-${f.id}`}
                      className={[
                        "lg:hidden grid transition-[grid-template-rows] duration-300 ease-out",
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden pb-6">
                        <div className="pl-7 pr-2 sm:pl-9">
                          <div className="mt-2 overflow-hidden">
                            <img
                              src={f.imageSrc}
                              alt={f.imageAlt}
                              className="w-full h-auto"
                              draggable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* On tablet (<lg), show the active image above the list (optional) */}
          <div className="lg:hidden -mt-6 hidden sm:block">
            {/* If you want tablet to look closer to desktop: uncomment this block and remove accordion images */}
          </div>
        </div>
      </div>
    </section>
  );
}
