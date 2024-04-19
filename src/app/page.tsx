import Home from "@/components/home/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeoXer's Blog",
};

export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}
