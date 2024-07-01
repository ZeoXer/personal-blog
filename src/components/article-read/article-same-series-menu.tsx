import { getArticlesByCategory } from "@/data/article";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useIsLoading } from "@/hooks/use-is-loading";
import { FrontendRoutes } from "@/routes";
import { Article } from "@/types/article";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ArticleSameSeriesMenu = ({ article }: { article: Article }) => {
  const [articlesInSameCategory, setArticlesInSameCategory] = useState(
    [] as Article[]
  );
  const { setIsLoading } = useIsLoading();
  const { isDarkMode } = useDarkMode();

  const handleGetArticlesByCategory = useCallback(async () => {
    if (!article?.category_id) return;
    setIsLoading(true);

    const { status, data } = await getArticlesByCategory(article.category_id);
    setIsLoading(false);

    if (status) setArticlesInSameCategory(data);
  }, [article?.category_id, setIsLoading]);

  useEffect(() => {
    handleGetArticlesByCategory();
  }, [handleGetArticlesByCategory]);

  return (
    <aside className="hidden md:block w-1/6">
      <div className="sticky top-4">
        <h3
          className={clsx(
            "text-2xl mb-4 px-3 py-2 border-s-2",
            !isDarkMode && "border-gray-900"
          )}
        >
          系列文章
        </h3>
        <ul>
          {articlesInSameCategory.map((artic) => {
            return (
              <li
                key={artic.id}
                className={clsx(
                  "text-xl p-2 rounded-lg",
                  artic.id === article.id
                    ? isDarkMode
                      ? "bg-gray-500"
                      : "bg-gray-300"
                    : ""
                )}
              >
                <Link
                  href={`${FrontendRoutes.BLOG}/${artic.id}`}
                  className="md:hover:underline block transition-all md:hover:translate-x-3 duration-300 truncate"
                >
                  {artic.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default ArticleSameSeriesMenu;
