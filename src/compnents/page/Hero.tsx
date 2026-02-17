import hero from "../../assets/hero.webp";
import docsText from "../../assets/docstext.svg";
import SignInButton from "../common/buttons/SignIn";
import TryDocs from "../common/buttons/TryDocs";

const Hero = () => {
  return (
    <>
      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
            <div className="w-full max-w-xl lg:max-w-none text-center lg:text-start flex flex-col items-center lg:items-start mx-auto">
              <img
                src={docsText}
                alt="Google Docs"
                className="h-7 sm:h-8 w-auto"
              />

              <h1 className="mt-6 font-bold tracking-tight text-gray-900 text-[40px] leading-[1.05] sm:text-[48px] sm:leading-[1.05] lg:text-[64px] lg:leading-[1.02]">
                Online, collaborative documents
              </h1>

              <p className="mt-6 text-[#5f6368] text-base sm:text-lg leading-relaxed max-w-lg">
                AI-powered documents to help you and your team create and
                collaborate on content.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center items-center justify-center gap-3 sm:gap-4">
                <SignInButton />
                <TryDocs />
              </div>
            </div>

            <div className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-140 lg:max-w-160">
                <img src={hero} alt="Docs hero" className="w-full h-auto" />

                <div className="pointer-events-none absolute -inset-6 -z-10 blur-2xl opacity-40">
                  <div className="h-full w-full rounded-[32px] bg-gradient-to-br from-blue-100 via-white to-indigo-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
