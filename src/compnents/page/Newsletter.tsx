import React, { useMemo, useState } from "react";

type CountryOption = { code: string; name: string };

export function NewsletterSignup() {
  const countries: CountryOption[] = useMemo(
    () => [
      { code: "US", name: "United States" },
      { code: "NG", name: "Nigeria" },
      { code: "GB", name: "United Kingdom" },
      { code: "CA", name: "Canada" },
      { code: "DE", name: "Germany" },
      { code: "FR", name: "France" },
      { code: "IN", name: "India" },
      { code: "ZA", name: "South Africa" },
      { code: "GH", name: "Ghana" },
      { code: "KE", name: "Kenya" },
    ],
    [],
  );

  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [cloudOptIn, setCloudOptIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!emailValid) return;

    alert(
      `Signed up!\nEmail: ${email}\nCountry: ${country}\nCloud emails: ${
        cloudOptIn ? "Yes" : "No"
      }`,
    );
  };

  return (
    <section className="w-full bg-[#f1f3f4]" id="newsletter-footer">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 py-10 sm:py-12">
        <form
          onSubmit={onSubmit}
          className="mx-auto w-full max-w-3xl"
          noValidate
        >
          <h2 className="text-center font-medium tracking-tight text-gray-900 text-3xl sm:text-[33px]">
            Sign up for the Google Workspace newsletter
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-2">
                <span className="sr-only">Email</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email*"
                type="email"
                className={[
                  "w-full rounded border bg-white px-5 py-4 text-[18px] text-gray-900",
                  "placeholder:text-gray-500 outline-none",
                  "focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]",
                  submitted && !emailValid
                    ? "border-red-400 focus:ring-red-300 focus:border-red-400"
                    : "border-gray-400",
                ].join(" ")}
              />
              {submitted && !emailValid && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <div className="relative mt-1.5">
              <label className="absolute -top-2.5 left-4 px-1 bg-white text-[13px] font-medium text-gray-700 pointer-events-none z-10">
                Country*
              </label>

              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={[
                    "w-full appearance-none rounded border bg-white px-5 py-4 pr-12 text-[18px] text-gray-900",
                    "outline-none",
                    "focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]",
                    "border-gray-400",
                  ].join(" ")}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-4 max-w-3xl mx-auto">
            <input
              checked={cloudOptIn}
              onChange={(e) => setCloudOptIn(e.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-400 text-[#1a73e8] focus:ring-[#1a73e8]"
            />
            <p className="text-[14px] leading-relaxed text-gray-700">
              Also sign me up for Google Cloud emails with news, product
              updates, event information, special offers, and more. (Optional
              and you can unsubscribe at a later time).
            </p>
          </div>

          {/* Privacy line */}
          <p className="mt-6 text-[14px] max-w-3xl mx-auto text-gray-700">
            I understand my personal data will be processed in accordance with
            Google&apos;s{" "}
            <a
              href="#"
              className="text-[#1a73e8] hover:underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>

          {/* Button row */}
          <div className="mt-10 flex justify-end max-w-4xl">
            <button
              type="submit"
              className="rounded-full border border-gray-300 bg-white px-5 py-2 md:px-10 md:py-4 text-[#1a73e8] font-semibold text-md md:text-lg shadow-sm hover:bg-gray-50 transition"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
