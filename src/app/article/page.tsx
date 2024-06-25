import ArticleWrite from "@/components/article-write/article-write";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新建文章",
};

export default function NewArticlePage() {
  return (
    <div className="py-6 px-4">
      <ArticleWrite />
    </div>
  );
}
