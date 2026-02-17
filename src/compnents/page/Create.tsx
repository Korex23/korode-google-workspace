import { useMemo, useState } from "react";
import organize from "../../assets/documentTabs.webp";
import pageBreaks from "../../assets/pageBreaks.webp";
import documents from "../../assets/richDetails.webp";
import smart from "../../assets/smartCanvas.webp";

type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function Create() {
  const FEATURES: Feature[] = useMemo(
    () => [
      {
        id: "jumpstart",
        label: "Get a jumpstart on your document with smart canvas",
        title: "Get a jumpstart on your document with smart canvas",
        description:
          "Instantly build formatted emails, calendar invites, review trackers, meeting notes, and more in Docs when you type ‘@.’",
        imageSrc: smart,
        imageAlt: "Meet in Docs UI",
      },
      {
        id: "access",
        label: "Easily populate your document with rich details",
        title: "Easily populate your document with rich details",
        description:
          "Use smart chips to add names, files, calendar events, dropdown menus, and more when you type ‘@.’",
        imageSrc: documents,
        imageAlt: "Sharing permissions UI",
      },
      {
        id: "collab",
        label: "Remove page breaks and write without limits",
        title: "Remove page breaks and write without limits",
        description:
          "Choose pageless mode to create content - continuously write and scroll without interruption.",
        imageSrc: pageBreaks,
        imageAlt: "Collaboration UI",
      },
      {
        id: "versions",
        label: "Stay organized with document tabs",
        title: "Stay organized with document tabs",
        description:
          "Create a tab for each part of a project, plan, or report and keep everything in one place - never lose track of your documents again.",
        imageSrc: organize,
        imageAlt: "Version history UI",
      },
    ],
    [],
  );

  const [activeId, setActiveId] = useState(FEATURES[3]?.id ?? FEATURES[0].id);

  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section id="create" className="mb-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Effortlessly create documents
        </h2>
        <p className="mt-3 text-gray-600 text-base sm:text-lg">
          Never start a document from scratch - get started with templates and
          building blocks to get a professional look from the start.
        </p>
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-stretch">
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
                            "mt-3 text-[16px] leading-relaxed",
                            isActive
                              ? "text-gray-600"
                              : "text-transparent select-none h-0 overflow-hidden",
                          ].join(" ")}
                        >
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

          {/* On tablet (<lg), show the active image above the list (optional) */}
          <div className="lg:hidden -mt-6 hidden sm:block">
            {/* If you want tablet to look closer to desktop: uncomment this block and remove accordion images */}
          </div>
        </div>
      </div>
    </section>
  );
}
