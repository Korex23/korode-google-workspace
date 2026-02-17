import { useMemo, useState } from "react";

type FooterGroup = {
  title: string;
  links: { label: string; href?: string }[];
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`h-5 w-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
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

export default function WorkspaceFooter() {
  const groups: FooterGroup[] = useMemo(
    () => [
      {
        title: "Included applications",
        links: [
          { label: "Gmail" },
          { label: "Meet" },
          { label: "Chat" },
          { label: "Calendar" },
          { label: "Drive" },
          { label: "Docs" },
          { label: "Sheets" },
          { label: "Slides" },
          { label: "Forms" },
          { label: "Sites" },
          { label: "Keep" },
          { label: "Apps Script" },
        ],
      },
      {
        title: "Security and management",
        links: [
          { label: "Admin" },
          { label: "Endpoint" },
          { label: "Vault" },
          { label: "Work Insights" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "New Business" },
          { label: "Small Business" },
          { label: "Enterprise" },
          { label: "Retail" },
          { label: "Manufacturing" },
          { label: "Professional Services" },
          { label: "Technology" },
          { label: "Healthcare" },
          { label: "Government" },
          { label: "Education" },
          { label: "Nonprofits" },
          { label: "Artificial Intelligence" },
        ],
      },
      {
        title: "Pricing",
        links: [{ label: "Compare pricing plans" }],
      },
      {
        title: "Add-ons",
        links: [
          { label: "Meet hardware" },
          { label: "Google Voice" },
          { label: "AppSheet" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Working remotely" },
          { label: "Security" },
          { label: "Customer Stories" },
          { label: "FAQs" },
          { label: "Partners" },
          { label: "Marketplace" },
          { label: "Integrations" },
          { label: "Training & Certification" },
          { label: "Refer Google Workspace" },
        ],
      },
      {
        title: "Learning and support",
        links: [
          { label: "Admin Help" },
          { label: "Setup and Deployment Center" },
          { label: "Learning Center for Users" },
          { label: "Forums for Admins" },
          { label: "Google Workspace Dashboard" },
          { label: "What's New in Google Workspace" },
          { label: "Find a Google Workspace Partner" },
          { label: "Join the community of IT Admins" },
          { label: "Press" },
        ],
      },
      {
        title: "More from Google",
        links: [
          { label: "Google Cloud" },
          { label: "Google Domains" },
          { label: "Chrome Enterprise" },
          { label: "Google Business Solutions" },
          { label: "Google Ads" },
          { label: "Business Messages" },
        ],
      },
    ],
    [],
  );

  const [openTitles, setOpenTitles] = useState<Set<string>>(() => new Set());

  const toggle = (title: string) => {
    setOpenTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 pt-10 pb-26">
        {/* Top strip */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200">
          <div className="flex md:items-center md:flex-row flex-col  gap-3 text-sm text-gray-600">
            <span>
              Follow our{" "}
              <a href="#" className="text-gray-700 hover:underline">
                Blog
              </a>
            </span>
            <span className="text-gray-300 hidden md:block">|</span>

            {/* socials (placeholders) */}
            <div className="flex items-center md:gap-8 gap-4 text-gray-500">
              <a href="#" aria-label="X" className="hover:text-gray-800">
                <img
                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-1umOaKNcjcEr2mhzCSlF12-1f0cb9d1b806aaa99772cdc5bc26c043-social-x.svg"
                  alt="Follow us on X"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-gray-800">
                <img
                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-2OApfq8kkSLS05HBSQsgRo-4c87d4f931acc7af2cca2e55bd0ff8b5-social-youtube.svg"
                  alt="YouTube"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-gray-800">
                <img
                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-4CtJLWoMz9zitTD6evCrRJ-e26868c4b703bdaf7269d28f277abd8b-social-linkedin.svg"
                  alt="LinkedIn"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-800"
              >
                <img
                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-2MQ7jfS9rcCfUITolVRnEL-3b7ac6e9dac32136215b879b25d16826-social-instagram.svg"
                  alt="Instagram"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-gray-800">
                <img
                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-5Udpge5UoQaK9XlYfriDJY-9222b4e3f4e7c0d14a779d88163211a6-social-facebook.svg"
                  alt="Facebook"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-gray-800">
                <img
                  src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-4jzpKqKaRj5vYLZTFOS568-d34beb4904efce872112594ce0bcad13-social-tiktok.svg"
                  alt="TikTok"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Search */}
          <div className="w-full sm:w-[320px]">
            <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-gray-500"
              >
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                placeholder="Search this site"
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="hidden xl:grid grid-cols-5 gap-8 pt-8">
          <div className="col-span-1">
            <FooterCol title={groups[0].title} links={groups[0].links} />
          </div>

          <div className="col-span-1">
            <FooterCol title={groups[1].title} links={groups[1].links} />
            <div className="mt-8">
              <FooterCol title={groups[2].title} links={groups[2].links} />
            </div>
          </div>

          <div className="col-span-1">
            <FooterCol title={groups[3].title} links={groups[3].links} />
            <div className="mt-8">
              <FooterCol title={groups[4].title} links={groups[4].links} />
            </div>
          </div>

          <div className="col-span-1">
            <FooterCol title={groups[5].title} links={groups[5].links} />
          </div>

          <div className="col-span-1">
            <FooterCol title={groups[6].title} links={groups[6].links} />
            <div className="mt-8">
              <FooterCol title={groups[7].title} links={groups[7].links} />
            </div>
          </div>
        </div>

        <div className="xl:hidden pt-6">
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {groups.map((g) => {
              const open = openTitles.has(g.title);
              return (
                <div key={g.title} className="py-2">
                  <button
                    type="button"
                    onClick={() => toggle(g.title)}
                    className="w-full flex items-center justify-between py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[18px] text-gray-900 font-normal">
                      {g.title}
                    </span>
                    <Chevron open={open} />
                  </button>

                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-4 space-y-3">
                        {g.links.map((l) => (
                          <li key={l.label}>
                            <a
                              href={l.href ?? "#"}
                              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 pt-3 border-t border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-sm text-gray-600">
            <img
              src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-2QNOheeN6FD0S5Sfmqzhjn-b7f4e1aad73efc4d18b33d89e934fac5-logo-google.svg"
              alt="Google"
              width="84"
              height="28"
              loading="lazy"
            />
            <div className="flex gap-4 sm:gap-6 items-center text-[12px]">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                About Google
              </a>
              <a href="#" className="hover:underline">
                Google Products
              </a>
              <a href="#" className="hover:underline">
                Help
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a
              href="#"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#5f6368"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path>
                </svg>
              </span>
              Help
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300">
                <svg
                  part="language-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path>
                </svg>
              </span>
              English
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href?: string }[];
}) {
  return (
    <div>
      <h4 className="text-[14px] font-semibold text-[#5f6368] mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href ?? "#"}
              className="text-xs text-[#616161] font-semibold hover:text-gray-900 hover:underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
