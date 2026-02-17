import docs from "../../assets/docs.svg";
import SignInButton from "../common/buttons/SignIn";
import TryDocs from "../common/buttons/TryDocs";

export function DocsCtaBanner() {
  return (
    <section className="mx-auto py-10 sm:py-14 md:w-[98%] w-full">
      <div className="mx-auto">
        <div className="rounded-xl bg-[#f1f3f4] px-6 sm:px-10 py-12 sm:py-16 text-center">
          <div className="flex justify-center mb-3">
            <img src={docs} alt="docs" />
          </div>

          <h2 className="mx-auto max-w-3xl text-2xl sm:text-4xl font-semibold text-gray-900 leading-tight">
            Create, collaborate, and refine
            <br className="hidden sm:block" />
            your content with Google Docs
          </h2>

          <div className="mt-8 flex flex-col items-center gap-4">
            <SignInButton />
            <TryDocs />
          </div>
        </div>
      </div>
    </section>
  );
}
