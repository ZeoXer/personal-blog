"use client";

import clsx from "clsx";
import SignInForm from "./sign-in-form";
import { useDarkMode } from "@/hooks/use-dark-mode";

const SignIn: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={clsx(
        "w-full md:w-2/5 2xl:w-1/5 border-2 mx-auto rounded-lg p-4",
        !isDarkMode && "border-gray-900"
      )}
    >
      <h2 className="text-3xl mb-8 font-semibold">使用者登入</h2>
      <SignInForm />
    </div>
  );
};

export default SignIn;
