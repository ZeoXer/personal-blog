import ArticleRead from "@/components/article-read/article-read";
import Search from "@/components/search/search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "閱讀文章",
};

export default function ReadArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  return (
    <div className="py-6 px-4">
      <ArticleRead articleId={+params.articleId} />
    </div>
  );
}
