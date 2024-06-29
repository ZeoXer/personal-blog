import ArticleWrite from "@/components/article-write/article-write";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "編輯文章",
};

export default function EditArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  return (
    <div className="py-6 px-4">
      <ArticleWrite articleId={+params.articleId} />
    </div>
  );
}
