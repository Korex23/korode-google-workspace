import hero from "../../assets/safe.webp";
import editing from "../../assets/editingType.webp";

const Security = () => {
  return (
    <>
      <section id="security" className="scroll-mt-24">
        <div className="w-full bg-white">
          <div className="mx-auto max-w-7xl  py-10 sm:py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
              <div className="w-full max-w-xl lg:max-w-none text-center lg:text-start flex flex-col items-center lg:items-start mx-auto">
                <h1 className="font-medium tracking-tight text-gray-900 text-[24px] leading-[1.05] sm:text-[30px] sm:leading-[1.05] lg:text-[44px] lg:leading-[1.02]">
                  Stay safe
                </h1>

                <p className="mt-6 text-[#5f6368] text-base sm:text-lg leading-relaxed max-w-lg">
                  Your data is encrypted by default, and an array of{" "}
                  <span className="text-blue-600 underline">
                    safety measures
                  </span>
                  – like{" "}
                  <span className="text-blue-600 underline">
                    advanced client-side
                  </span>{" "}
                  encryption, anti-abuse measures, and privacy controls – keep
                  your{" "}
                  <span className="text-blue-600 underline">data private.</span>
                </p>
              </div>

              <div className="w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-140 lg:max-w-260">
                  <img
                    src={hero}
                    alt="Docs hero"
                    className="w-full h-auto lg:scale-[140%]"
                  />

                  <div className="pointer-events-none absolute -inset-6 -z-10 blur-2xl opacity-40">
                    <div className="h-full w-full rounded-[32px] bg-gradient-to-br from-blue-100 via-white to-indigo-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white">
          <div className="mx-auto max-w-7xl  py-10 sm:py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
              <div className="w-full flex justify-center lg:justify-end order-2 lg:order-1">
                <div className="relative w-full max-w-140 lg:max-w-260">
                  <img
                    src={editing}
                    alt="Docs hero"
                    className="w-full h-auto lg:scale-[140%]"
                  />

                  <div className="pointer-events-none absolute -inset-6 -z-10 blur-2xl opacity-40">
                    <div className="h-full w-full rounded-[32px] bg-gradient-to-br from-blue-100 via-white to-indigo-100" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[90%] max-w-xl mr-auto lg:max-w-none text-center lg:text-start flex flex-col items-center lg:items-start mx-auto order-1 lg:order-2">
                <h1 className="font-medium tracking-tight text-gray-900 text-[24px] leading-[1.05] sm:text-[30px] sm:leading-[1.05] lg:text-[44px] lg:leading-[1.02]">
                  Use Docs to improve editing of popular file types
                </h1>

                <p className="mt-6 text-[#5f6368] text-base sm:text-lg leading-relaxed max-w-lg">
                  Import popular file types like Microsoft Word documents and
                  PDF files and work with them in Docs. Importing files into
                  Docs unlocks powerful collaborative and assistive features,
                  including comments, action items, and built-in intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Security;
