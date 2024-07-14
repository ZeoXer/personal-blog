import ArticleCategoryMain from "@/components/articles-main/article-category-main";

export default function ArticleCategoryPage({
  params,
}: {
  params: { authorName: string };
}) {
  return (
    <div className="p-5">
      <h2 className="mb-8 text-4xl">{params.authorName} 的文章集</h2>
      <div className="w-full md:w-4/5">
        <ArticleCategoryMain authorName={params.authorName} />
      </div>
    </div>
  );
}
