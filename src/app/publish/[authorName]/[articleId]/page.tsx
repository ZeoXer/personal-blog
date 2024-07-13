import ArticleRead from "@/components/article-read/article-read";
import { getPublicArticle } from "@/data/article";
import { Metadata } from "next";

type Props = {
  params: {
    authorName: string;
    articleId: string;
  };
};

export const metadata: Metadata = {
  title: "閱讀文章",
  description: "閱讀文章",
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { articleId, authorName } = params;

//   const { data, message, status } = await getPublicArticle(
//     +articleId,
//     authorName
//   );

//   if (status) {
//     return {
//       title: data.title,
//       description: `Read article by ${params.authorName}`,
//     };
//   }

//   return {
//     title: message,
//     description: `Read article`,
//   };
// }

export default function ReadArticlePage({ params }: Props) {
  return (
    <div className="py-6 px-4">
      <ArticleRead
        authorName={params.authorName}
        articleId={+params.articleId}
      />
    </div>
  );
}
