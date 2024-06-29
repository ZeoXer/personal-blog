"use client";

import { getArticle, getArticlesByCategory } from "@/data/article";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useIsLoading } from "@/hooks/use-is-loading";
import { Article } from "@/types/article";
import { formatDateString } from "@/utils";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import MarkdownDisplay from "../common/markdown-display";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useImage } from "@/hooks/use-image";
import Image from "next/image";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";

const ArticleRead = ({ articleId }: { articleId: number }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [articlesInSameCategory, setArticlesInSameCategory] = useState(
    [] as Article[]
  );
  const { avatar } = useImage();
  const { isDarkMode } = useDarkMode();
  const { setIsLoading } = useIsLoading();

  const handleGetArticle = useCallback(async () => {
    if (!articleId) return;
    setIsLoading(true);
    const { status, data } = await getArticle(articleId);
    setIsLoading(false);
    if (status) setArticle(data);
  }, [articleId, setIsLoading]);

  const handleGetArticlesByCategory = useCallback(async () => {
    if (!article?.category_id) return;
    setIsLoading(true);

    const { status, data } = await getArticlesByCategory(article.category_id);
    setIsLoading(false);

    if (status) setArticlesInSameCategory(data);
  }, [article?.category_id, setIsLoading]);

  useEffect(() => {
    handleGetArticle();
    handleGetArticlesByCategory();
  }, [handleGetArticle, handleGetArticlesByCategory]);

  return (
    <main className="flex justify-between gap-8 px-0 md:px-4 pt-4">
      <aside className="hidden md:block w-1/6">
        <div className="sticky top-4">
          <h3
            className={clsx(
              "text-2xl mb-4 px-3 py-2 border-s-2",
              !isDarkMode && "border-gray-900"
            )}
          >
            其他系列文章
          </h3>
          <ul>
            {articlesInSameCategory.map((article) => {
              return (
                <li key={article.id} className="text-xl py-2">
                  <Link
                    href={`${FrontendRoutes.BLOG}/${article.id}`}
                    className="md:hover:underline block transition-all md:hover:translate-x-3 duration-300 truncate"
                  >
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <section className="w-11/12 md:w-2/3 mx-auto">
        <div
          className={clsx("border-b-2 pb-4", !isDarkMode && "border-gray-900")}
        >
          <h1 className="text-4xl md:text-5xl mb-4 font-semibold">
            {article?.title}
          </h1>
          <h3 className="text-2xl mb-1 flex items-center gap-2">
            <div className="size-6 md:size-8 relative rounded-full">
              <Image
                src={avatar}
                alt="avatar"
                fill
                sizes="48px"
                className="rounded-full object-cover"
              />
            </div>
            <span>{article?.username}</span>
          </h3>
          <p className="text-lg">
            <ClockIcon className="inline w-6 md:w-8 me-2 mb-1" />
            最後更新{" "}
            {article?.updated_at
              ? formatDateString(article?.updated_at)
              : "Error"}
          </p>
        </div>
        <article className="pt-4">
          <MarkdownDisplay content={article?.content || ""} />
        </article>
      </section>
      <aside className="hidden md:block">
        <h3
          className={clsx(
            "text-2xl mb-4 px-3 py-2 border-2 rounded-lg",
            !isDarkMode && "border-gray-900"
          )}
        >
          其他系列文章
        </h3>
        <ul>
          {articlesInSameCategory.map((article) => {
            return (
              <li key={article.id} className="text-xl py-2">
                <Link
                  href={`${FrontendRoutes.BLOG}/${article.id}`}
                  className="md:hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </main>
  );
};

export default ArticleRead;
