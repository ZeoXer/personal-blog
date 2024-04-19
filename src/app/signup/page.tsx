import SignUp from "@/components/auth/sign-up";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "註冊新帳號",
};

export default function SignupPage() {
  return (
    <div className="py-6 px-4">
      <SignUp />
    </div>
  );
}
