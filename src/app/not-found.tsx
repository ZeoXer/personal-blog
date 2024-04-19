import NotFound from "@/components/error/not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default function NotFoundPage() {
  return (
    <div>
      <NotFound />
    </div>
  );
}
