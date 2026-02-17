const SignInButton = ({ padding }: { padding?: string }) => {
  return (
    <button
      className={`inline-flex text-[13px] sm:text-base items-center justify-center rounded-full bg-[#1a73e8] ${
        padding ?? "px-7 py-3"
      } text-white font-semibold shadow-sm hover:bg-[#1668d4]`}
    >
      Sign in
    </button>
  );
};

export default SignInButton;
