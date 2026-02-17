import React, { useEffect, useMemo, useRef, useState } from "react";
import SignInButton from "../common/buttons/SignIn";
import TryDocs from "../common/buttons/TryDocs";

type AppItem = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="h-9 w-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
    {children}
  </div>
);

const CaretDown = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M7 10l5 5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Hamburger = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseX = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function WorkspaceNavbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const [showBottomCta, setShowBottomCta] = useState(false);

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const appsLeft: AppItem[] = useMemo(
    () => [
      {
        title: "Gmail",
        subtitle: "Custom business email",
        icon: <span className="text-[13px] font-bold">M</span>,
      },
      {
        title: "Drive",
        subtitle: "Cloud storage",
        icon: <span className="text-[13px] font-bold">D</span>,
      },
      {
        title: "Meet",
        subtitle: "Video conferencing",
        icon: <span className="text-[13px] font-bold">Me</span>,
      },
      {
        title: "Chat",
        subtitle: "Messaging for teams",
        icon: <span className="text-[13px] font-bold">C</span>,
      },
      {
        title: "Calendar",
        subtitle: "Shared calendars",
        icon: <span className="text-[13px] font-bold">Ca</span>,
      },
      {
        title: "Tasks",
        subtitle: "Tasks and task lists",
        icon: <span className="text-[13px] font-bold">T</span>,
      },
    ],
    [],
  );

  const appsMid: AppItem[] = useMemo(
    () => [
      {
        title: "Docs",
        subtitle: "Word processing",
        icon: <span className="text-[13px] font-bold">Do</span>,
      },
      {
        title: "Sheets",
        subtitle: "Spreadsheets",
        icon: <span className="text-[13px] font-bold">S</span>,
      },
      {
        title: "Slides",
        subtitle: "Presentation builder",
        icon: <span className="text-[13px] font-bold">Sl</span>,
      },
      {
        title: "Forms",
        subtitle: "Online forms and surveys",
        icon: <span className="text-[13px] font-bold">F</span>,
      },
      {
        title: "Sites",
        subtitle: "Team and project sites",
        icon: <span className="text-[13px] font-bold">Si</span>,
      },
    ],
    [],
  );

  const appsRight: AppItem[] = useMemo(
    () => [
      {
        title: "Gemini app",
        subtitle: "AI assistant",
        icon: <span className="text-[13px] font-bold">G</span>,
      },
      {
        title: "NotebookLM",
        subtitle: "AI research assistant",
        icon: <span className="text-[13px] font-bold">N</span>,
      },
      {
        title: "Vids",
        subtitle: "Video editor",
        icon: <span className="text-[13px] font-bold">V</span>,
      },
      {
        title: "Keep",
        subtitle: "Digital notes",
        icon: <span className="text-[13px] font-bold">K</span>,
      },
      {
        title: "AppSheet",
        subtitle: "No-code apps and automations",
        icon: <span className="text-[13px] font-bold">A</span>,
      },
    ],
    [],
  );

  // Close panels on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProductsOpen(false);
        setMobileOpen(false);
        setMobileProductsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hide desktop dropdown when resizing to mobile, etc.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1280) setProductsOpen(false);
      if (window.innerWidth >= 640) {
        // When leaving tiny screens, stop forcing bottom CTA state.
        setShowBottomCta(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bottom CTA: show on scroll down, hide on scroll up (small screens only)
  useEffect(() => {
    const isSmall = () => window.innerWidth < 640;

    const onScroll = () => {
      if (!isSmall()) return;

      const currentY = window.scrollY || 0;
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const lastY = lastYRef.current;
        const diff = currentY - lastY;

        // Ignore tiny jitter
        if (Math.abs(diff) > 6) {
          if (diff > 0) {
            // scrolling down
            setShowBottomCta(true);
          } else {
            // scrolling up
            setShowBottomCta(false);
          }
          lastYRef.current = currentY;
        }

        tickingRef.current = false;
      });
    };

    lastYRef.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({ children }: { children: React.ReactNode }) => (
    <a
      href="#"
      className="text-[14px] text-gray-600 hover:text-gray-900 transition px-2 py-2 rounded-md"
    >
      {children}
    </a>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto px-4 sm:px-6 xl:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                className="sm:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setMobileOpen(true);
                  setMobileProductsOpen(false);
                }}
                aria-label="Open menu"
              >
                <Hamburger />
              </button>

              <a href="#" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 3995 512"
                  className="h-5 w-auto"
                >
                  <defs></defs>
                  <defs>
                    <clipPath id="a">
                      <path fill="none" d="M0 0h3996v512H0z"></path>
                    </clipPath>
                  </defs>
                  <path
                    fill="#5f6368"
                    d="M2087 39h47l-94 350h-46l-75-231h-2l-76 231h-46l-97-350h47l74 275h2l76-228h42l76 228h2l70-275z"
                  ></path>
                  <g fill="#5f6368" clip-path="url(#a)">
                    <path d="M2129 269q0-55 35-91t89-36 88 36q35 36 35 91 0 56-35 92t-88 36-89-36q-35-36-35-92m45 0q0 39 23 63t56 24q33 0 56-24t22-63q0-38-22-62-23-24-56-24t-56 24q-23 24-23 62M2453 389h-45V149h43v40h2q7-20 29-33t42-14q19 0 33 6l-14 44q-8-3-26-3-26 0-45 20t-19 48zM2789 389h-55l-74-113-37 37v76h-45V39h45v216l104-106h57v2l-93 93 98 143v2z"></path>
                    <path d="M2984 323q0 31-27 53t-70 21q-36 0-63-19a104 104 0 01-39-49l40-17q9 21 25 33a62 62 0 0037 12q22 0 36-9t15-22q0-23-35-34l-42-10q-70-18-70-68 0-33 27-53t68-20q32 0 58 16t36 40l-40 17a51 51 0 00-22-24 70 70 0 00-35-8 58 58 0 00-32 8q-14 9-14 22 0 21 39 29l36 10q72 17 72 72M3140 397q-26 0-48-11t-33-30h-2l2 33v106h-45V149h43v34h2q11-19 33-30t49-11q47 0 80 37 34 37 34 90 0 54-34 91-33 37-80 37m-8-41q33 0 55-24t22-63q0-37-22-62t-55-24q-33 0-55 24-21 25-21 62 0 39 21 63 22 24 55 24M3378 142q50 0 79 26t29 73v148h-43v-33h-2q-28 41-75 41-39 0-66-23t-27-59q0-37 28-59t76-22q40 0 66 14v-10q0-24-19-40a64 64 0 00-43-16q-38 0-60 32l-40-25q33-47 97-47m-58 174q0 18 15 29t35 12q28 0 50-21t23-49q-21-17-59-17-27 0-46 13t-18 33M3639 397q-54 0-89-36-35-37-35-92t35-91q35-36 89-36 37 0 64 18t41 51l-41 17q-19-45-67-45-31 0-54 25-22 25-22 61t22 62q23 25 54 25 49 0 69-45l41 17q-14 33-42 51t-65 18M3881 397q-53 0-87-36t-34-92q0-54 33-91t85-36q54 0 85 34t32 97v5h-189q1 35 23 57t54 21q43 0 68-43l40 20a120 120 0 01-45 47q-28 17-65 17m-72-157h138q-2-25-20-41t-50-16q-25 0-43 15t-25 42"></path>
                  </g>
                  <g clip-path="url(#a)">
                    <path
                      fill="#4285f4"
                      d="M202 236v-55h182a178 178 0 013 34c0 40-11 91-47 126-35 37-79 56-139 56C92 397 0 308 0 199S92 0 201 0c61 0 104 24 137 55l-39 38A142 142 0 0059 199c0 80 63 144 142 144 52 0 82-21 101-40 15-15 25-37 29-67z"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="M664 269c0 74-58 128-129 128s-128-54-128-128 58-128 128-128 129 54 129 128m-57 0c0-46-33-77-72-77s-72 31-72 77 34 78 72 78 72-32 72-78"
                    ></path>
                    <path
                      fill="#fbbc04"
                      d="M944 269c0 74-58 128-129 128s-128-54-128-128 58-128 128-128 129 54 129 128m-57 0c0-46-33-77-72-77s-72 31-72 77 34 78 72 78 72-32 72-78"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="M1212 149v230c0 94-56 133-122 133-62 0-99-42-113-76l49-20c9 21 30 46 64 46 43 0 69-27 69-75v-19h-2a87 87 0 01-68 29c-63 0-122-56-122-127 0-72 59-129 122-129 31 0 55 14 68 29h2v-21zm-49 121c0-45-30-78-69-78-38 0-71 33-71 78 0 44 33 77 71 77 39 0 69-33 69-77"
                    ></path>
                    <path fill="#34a853" d="M1251 15h56v375h-56z"></path>
                    <path
                      fill="#ea4335"
                      d="M1524 311l44 30c-14 20-48 56-107 56-73 0-127-56-127-128 0-76 55-128 121-128s99 53 109 82l6 14-171 71c13 26 33 39 62 39s48-14 63-36m-134-46l114-47c-6-16-25-27-47-27-29 0-69 25-67 74"
                    ></path>
                  </g>
                </svg>
              </a>

              <nav className="hidden xl:flex items-center gap-1">
                <NavLink>Solutions</NavLink>

                <div className="relative">
                  <button
                    className="text-[14px] text-gray-600 hover:text-gray-900 transition px-2 py-2 rounded-md inline-flex items-center gap-1"
                    onClick={() => setProductsOpen((s) => !s)}
                    aria-expanded={productsOpen}
                  >
                    Products
                    <CaretDown
                      className={`text-gray-500 transition ${productsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <NavLink>Industries</NavLink>
                <NavLink>AI</NavLink>
                <NavLink>Pricing</NavLink>
                <NavLink>Resources</NavLink>
              </nav>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <TryDocs paddingStyle1="px-4 py-2" paddingStyle2="px-4 py-2" />
              <SignInButton padding="px-4 py-2" />
            </div>
          </div>
        </div>

        <div className="hidden sm:block xl:hidden border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="h-14 flex items-center gap-1">
              <NavLink>Solutions</NavLink>

              <div className="relative">
                <button
                  className="text-[14px] text-gray-600 hover:text-gray-900 transition px-2 py-2 rounded-md inline-flex items-center gap-1"
                  onClick={() => setProductsOpen((s) => !s)}
                  aria-expanded={productsOpen}
                >
                  Products
                  <CaretDown
                    className={`text-gray-500 transition ${productsOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <NavLink>Industries</NavLink>
              <NavLink>AI</NavLink>
              <NavLink>Pricing</NavLink>
              <NavLink>Resources</NavLink>
            </div>
          </div>
        </div>

        {productsOpen && (
          <>
            <button
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setProductsOpen(false)}
              aria-label="Close products menu"
            />
            <div className="absolute left-0 right-0 top-full z-50">
              <div className="mx-auto">
                <div className="bg-white border border-gray-200 shadow-xl overflow-hidden h-[80vh]">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Column 1 */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {appsLeft.map((app) => (
                          <a
                            key={app.title}
                            href="#"
                            className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition"
                          >
                            <IconBox>{app.icon}</IconBox>
                            <div>
                              <div className="text-[14px] font-semibold text-gray-900">
                                {app.title}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                {app.subtitle}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
                      <div className="space-y-4">
                        {appsMid.map((app) => (
                          <a
                            key={app.title}
                            href="#"
                            className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition"
                          >
                            <IconBox>{app.icon}</IconBox>
                            <div>
                              <div className="text-[14px] font-semibold text-gray-900">
                                {app.title}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                {app.subtitle}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
                      <div className="space-y-4">
                        {appsRight.map((app) => (
                          <a
                            key={app.title}
                            href="#"
                            className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition"
                          >
                            <IconBox>{app.icon}</IconBox>
                            <div>
                              <div className="text-[14px] font-semibold text-gray-900">
                                {app.title}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                {app.subtitle}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Right rail */}
                    <div className="p-6 border-t lg:border-t-0 lg:border-l border-gray-100 bg-[#f8f9fb] relative col-span-2">
                      <button
                        onClick={() => setProductsOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        aria-label="Close"
                      >
                        <CloseX />
                      </button>

                      <div className="space-y-3 mt-2">
                        {[
                          "AI Solutions",
                          "AI Automation",
                          "Security",
                          "Admin console",
                          "Add-ons",
                          "See more apps",
                        ].map((t) => (
                          <a
                            key={t}
                            href="#"
                            className="block text-[14px] font-semibold text-gray-900 hover:underline"
                          >
                            {t}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu backdrop"
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-85 max-w-[86%] bg-white shadow-2xl border-r border-gray-200">
            <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200">
              <button
                className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <CloseX />
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3995 512"
                className="h-5 w-auto"
              >
                <defs></defs>
                <defs>
                  <clipPath id="a">
                    <path fill="none" d="M0 0h3996v512H0z"></path>
                  </clipPath>
                </defs>
                <path
                  fill="#5f6368"
                  d="M2087 39h47l-94 350h-46l-75-231h-2l-76 231h-46l-97-350h47l74 275h2l76-228h42l76 228h2l70-275z"
                ></path>
                <g fill="#5f6368" clip-path="url(#a)">
                  <path d="M2129 269q0-55 35-91t89-36 88 36q35 36 35 91 0 56-35 92t-88 36-89-36q-35-36-35-92m45 0q0 39 23 63t56 24q33 0 56-24t22-63q0-38-22-62-23-24-56-24t-56 24q-23 24-23 62M2453 389h-45V149h43v40h2q7-20 29-33t42-14q19 0 33 6l-14 44q-8-3-26-3-26 0-45 20t-19 48zM2789 389h-55l-74-113-37 37v76h-45V39h45v216l104-106h57v2l-93 93 98 143v2z"></path>
                  <path d="M2984 323q0 31-27 53t-70 21q-36 0-63-19a104 104 0 01-39-49l40-17q9 21 25 33a62 62 0 0037 12q22 0 36-9t15-22q0-23-35-34l-42-10q-70-18-70-68 0-33 27-53t68-20q32 0 58 16t36 40l-40 17a51 51 0 00-22-24 70 70 0 00-35-8 58 58 0 00-32 8q-14 9-14 22 0 21 39 29l36 10q72 17 72 72M3140 397q-26 0-48-11t-33-30h-2l2 33v106h-45V149h43v34h2q11-19 33-30t49-11q47 0 80 37 34 37 34 90 0 54-34 91-33 37-80 37m-8-41q33 0 55-24t22-63q0-37-22-62t-55-24q-33 0-55 24-21 25-21 62 0 39 21 63 22 24 55 24M3378 142q50 0 79 26t29 73v148h-43v-33h-2q-28 41-75 41-39 0-66-23t-27-59q0-37 28-59t76-22q40 0 66 14v-10q0-24-19-40a64 64 0 00-43-16q-38 0-60 32l-40-25q33-47 97-47m-58 174q0 18 15 29t35 12q28 0 50-21t23-49q-21-17-59-17-27 0-46 13t-18 33M3639 397q-54 0-89-36-35-37-35-92t35-91q35-36 89-36 37 0 64 18t41 51l-41 17q-19-45-67-45-31 0-54 25-22 25-22 61t22 62q23 25 54 25 49 0 69-45l41 17q-14 33-42 51t-65 18M3881 397q-53 0-87-36t-34-92q0-54 33-91t85-36q54 0 85 34t32 97v5h-189q1 35 23 57t54 21q43 0 68-43l40 20a120 120 0 01-45 47q-28 17-65 17m-72-157h138q-2-25-20-41t-50-16q-25 0-43 15t-25 42"></path>
                </g>
                <g clip-path="url(#a)">
                  <path
                    fill="#4285f4"
                    d="M202 236v-55h182a178 178 0 013 34c0 40-11 91-47 126-35 37-79 56-139 56C92 397 0 308 0 199S92 0 201 0c61 0 104 24 137 55l-39 38A142 142 0 0059 199c0 80 63 144 142 144 52 0 82-21 101-40 15-15 25-37 29-67z"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="M664 269c0 74-58 128-129 128s-128-54-128-128 58-128 128-128 129 54 129 128m-57 0c0-46-33-77-72-77s-72 31-72 77 34 78 72 78 72-32 72-78"
                  ></path>
                  <path
                    fill="#fbbc04"
                    d="M944 269c0 74-58 128-129 128s-128-54-128-128 58-128 128-128 129 54 129 128m-57 0c0-46-33-77-72-77s-72 31-72 77 34 78 72 78 72-32 72-78"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="M1212 149v230c0 94-56 133-122 133-62 0-99-42-113-76l49-20c9 21 30 46 64 46 43 0 69-27 69-75v-19h-2a87 87 0 01-68 29c-63 0-122-56-122-127 0-72 59-129 122-129 31 0 55 14 68 29h2v-21zm-49 121c0-45-30-78-69-78-38 0-71 33-71 78 0 44 33 77 71 77 39 0 69-33 69-77"
                  ></path>
                  <path fill="#34a853" d="M1251 15h56v375h-56z"></path>
                  <path
                    fill="#ea4335"
                    d="M1524 311l44 30c-14 20-48 56-107 56-73 0-127-56-127-128 0-76 55-128 121-128s99 53 109 82l6 14-171 71c13 26 33 39 62 39s48-14 63-36m-134-46l114-47c-6-16-25-27-47-27-29 0-69 25-67 74"
                  ></path>
                </g>
              </svg>
              <div className="w-10" />
            </div>

            <div className="px-4 py-4">
              <a
                href="#"
                className="block py-3 text-[15px] text-gray-800 font-medium"
              >
                Solutions
              </a>

              <button
                className="w-full flex items-center justify-between py-3 text-[15px] text-gray-800 font-medium"
                onClick={() => setMobileProductsOpen((s) => !s)}
                aria-expanded={mobileProductsOpen}
              >
                <span>Products</span>
                <CaretDown
                  className={`text-gray-600 transition ${mobileProductsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileProductsOpen && (
                <div className="mt-2 border-t border-gray-100 pt-2">
                  {[...appsLeft, ...appsMid].slice(0, 7).map((app) => (
                    <a
                      key={app.title}
                      href="#"
                      className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition"
                    >
                      <IconBox>{app.icon}</IconBox>
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900">
                          {app.title}
                        </div>
                        <div className="text-[12px] text-gray-500">
                          {app.subtitle}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              <a
                href="#"
                className="block py-3 text-[15px] text-gray-800 font-medium"
              >
                Industries
              </a>
              <a
                href="#"
                className="block py-3 text-[15px] text-gray-800 font-medium"
              >
                AI
              </a>
              <a
                href="#"
                className="block py-3 text-[15px] text-gray-800 font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="block py-3 text-[15px] text-gray-800 font-medium"
              >
                Resources
              </a>
            </div>
          </div>
        </div>
      )}

      <div
        className={[
          "sm:hidden fixed z-50",
          "left-0 right-0 bottom-0",
          "transition-all duration-300",
          showBottomCta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-center p-3">
            <div className="inline-flex items-center gap-3">
              <SignInButton padding="px-4 py-3" />
              <TryDocs paddingStyle1="px-4 py-3" paddingStyle2="px-3 py-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
