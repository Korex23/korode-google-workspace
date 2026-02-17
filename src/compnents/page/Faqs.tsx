import React, { useMemo, useState } from "react";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import { DocsCtaBanner } from "./Cta";

type FaqItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`h-5 w-5 text-[#1a73e8] transition-transform duration-200 ${
      open ? "rotate-180" : "rotate-0"
    }`}
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

export function FAQs() {
  const items: FaqItem[] = useMemo(
    () => [
      {
        id: "cost",
        question: "How much does Google Docs cost?",
        answer: (
          <div className="space-y-3 text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
            <p>Anyone with a Google Account can create in Docs.</p>
            <p>
              However, some features such as joining a Meet call from your
              documents are only available on Google Workspace plans. See{" "}
              <a href="#" className="text-[#1a73e8] hover:underline">
                plans and pricing for organizations
              </a>{" "}
              or{" "}
              <a href="#" className="text-[#1a73e8] hover:underline">
                Google Workspace Individual
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "convert",
        question: "Can I convert other documents to Google Docs?",
        answer: (
          <div className="space-y-3 text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
            <p>
              You can convert Microsoft Word documents into Google Docs format,
              or you can{" "}
              <a href="#" className="text-[#1a73e8] hover:underline">
                directly edit
              </a>{" "}
              Word documents, without having to make a copy. The original file
              will remain intact.
            </p>
          </div>
        ),
      },
      {
        id: "coedit",
        question: "How does co-editing work?",
        answer: (
          <div className="space-y-3 text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
            <p>
              Co-editing means that multiple people can work on the same
              document at the same time, without having to send versions back
              and forth. Sharing settings allows you to control who can view and
              edit a spreadsheet, and revision history enables you to revert to
              earlier versions. Also available in{" "}
              <a href="#" className="text-[#1a73e8] hover:underline">
                Google Sheets
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#1a73e8] hover:underline">
                Slides
              </a>
              .
            </p>
          </div>
        ),
      },
    ],
    [],
  );

  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(["cost"]));

  const allOpen = openIds.size === items.length;

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const collapseAll = () => setOpenIds(new Set());
  const expandAll = () => setOpenIds(new Set(items.map((i) => i.id)));

  return (
    <section id="faqs" className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Curious about Google Docs?
          </h2>
          <p className="mt-2 text-gray-600">
            Take a look at our FAQs to learn more.
          </p>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={allOpen ? collapseAll : expandAll}
            className="inline-flex items-center gap-2 text-[#1a73e8] hover:bg-[#1a73e8]/10 py-3 px-6 rounded-full text-sm font-medium"
            type="button"
          >
            {allOpen ? "Collapse all" : "Expand all"}
            {allOpen ? (
              <ChevronsDownUp size={20} />
            ) : (
              <ChevronsUpDown size={20} />
            )}
          </button>
        </div>

        <div className="mt-6 border-t border-gray-200 ">
          {items.map((item) => {
            const open = openIds.has(item.id);

            return (
              <div key={item.id} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full py-8 flex items-start justify-between gap-6 text-left"
                  aria-expanded={open}
                  aria-controls={`faq-${item.id}`}
                >
                  <span className="text-[18px] sm:text-[20px] font-medium text-gray-900">
                    {item.question}
                  </span>
                  <span className="mt-1">
                    <Chevron open={open} />
                  </span>
                </button>

                <div
                  id={`faq-${item.id}`}
                  className={[
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-10">{item.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DocsCtaBanner />
    </section>
  );
}
