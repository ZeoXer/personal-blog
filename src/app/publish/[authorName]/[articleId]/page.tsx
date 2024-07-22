import ArticleRead from "@/components/article-read/article-read";
import { getPublicArticle } from "@/data/article";
import { Article } from "@/types/article";
import { APIResponse } from "@/types/auth";
import axios from "axios";
import { Metadata } from "next";

type Props = {
  params: {
    authorName: string;
    articleId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleId, authorName } = params;

  const response = await axios.get<APIResponse<Article>>(
    `https://zeoxer.com/article/public/getArticle/${authorName}/${articleId}`
  );

  if (response.status && response.data.status) {
    return {
      title: authorName + " | " + response.data.data.title,
      description: response.data.data.content.slice(0, 20),
    };
  }

  return {
    title: "閱讀文章",
    description: `閱讀文章`,
  };
}

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
