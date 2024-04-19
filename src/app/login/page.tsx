import SignIn from "@/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用者登入",
};

export default function LoginPage() {
  return (
    <div className="py-6 px-4">
      <SignIn />
    </div>
  );
}
