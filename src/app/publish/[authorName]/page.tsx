import ArticleCategoryMain from "@/components/articles-main/article-category-main";
import Search from "@/components/search/search";
import { Metadata } from "next";

type Props = {
  params: {
    authorName: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: params.authorName + " 的文章集",
    description: `閱讀 ${params.authorName} 的文章集`,
  };
}

export default function ArticleCategoryPage({
  params,
}: {
  params: { authorName: string };
}) {
  return (
    <main className="p-5">
      <h2 className="mb-8 text-4xl">{params.authorName} 的文章集</h2>
      <div className="flex gap-4">
        <section className="w-full md:w-3/5 2xl:w-4/5">
          <ArticleCategoryMain authorName={params.authorName} />
        </section>
        <section className="hidden md:block md:w-2/5 2xl:w-1/5">
          <Search directTo="PUBLIC_READ" authorName={params.authorName} />
        </section>
      </div>
    </main>
  );
}
