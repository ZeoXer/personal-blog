import ArticleManage from "@/components/articles-manage/article-manage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理文章",
};

export default function ArticlesPage() {
  return (
    <div className="py-6 px-4">
      <ArticleManage />
    </div>
  );
}
