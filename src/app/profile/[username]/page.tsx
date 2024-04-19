import PersonalInfo from "@/components/personal-info/personal-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "個人檔案",
};

export default function PersonalInfoPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <PersonalInfo />
    </div>
  );
}
