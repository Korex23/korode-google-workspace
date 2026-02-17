const TryDocs = ({
  paddingStyle1,
  paddingStyle2,
}: {
  paddingStyle1?: string;
  paddingStyle2?: string;
}) => {
  return (
    <div className="inline-flex">
      <div className="inline-flex overflow-hidden rounded-full border border-gray-200 bg-white">
        <button
          className={`${
            paddingStyle1 ?? "px-6 py-3"
          } text-[#1a73e8] text-[13px] sm:text-base font-medium hover:bg-gray-50 transition text-center whitespace-nowrap`}
        >
          Try Docs for work
        </button>

        <button
          className={`${
            paddingStyle2 ?? "px-4 py-3"
          } border-l border-gray-300 hover:bg-gray-50 transition flex items-center justify-center`}
          aria-label="More options"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="#5f6368"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TryDocs;
