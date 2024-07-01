import { useDarkMode } from "@/hooks/use-dark-mode";
import { useArticleCategoryMain } from "./use-article-category-main";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Article, ArticleCategory } from "@/types/article";
import { useIsLoading } from "@/hooks/use-is-loading";
import { getArticlesByCategory } from "@/data/article";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";
import { formatDateString } from "@/utils";
import { useRouter } from "next/navigation";

const ArticleCategoryMainDetail = ({
  category,
}: {
  category: ArticleCategory;
}) => {
  const { isDarkMode } = useDarkMode();
  const { setIsLoading } = useIsLoading();
  const { isDetailOpen, currentCategory, setIsDetailOpen, setCurrentCategory } =
    useArticleCategoryMain();
  const [articles, setArticles] = useState([] as Article[]);
  const [alreadyFetched, setAlreadyFetched] = useState(false);
  const detail = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleGetArticles = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = await getArticlesByCategory(category.id);
    setIsLoading(false);
    if (status) {
      setArticles(data);
      setAlreadyFetched(true);
    }
  }, [category, setIsLoading]);

  useEffect(() => {
    if (isDetailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setCurrentCategory({ id: -1, name: "" });
    }
  }, [isDetailOpen, setCurrentCategory]);

  useEffect(() => {
    if (!alreadyFetched && currentCategory.id === category.id) {
      handleGetArticles();
    }
  }, [alreadyFetched, category, currentCategory, handleGetArticles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!detail.current) return;

      if (!detail.current.contains(event.target as Node)) {
        setIsDetailOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [setIsDetailOpen]);

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-[1000] bg-opacity-50 bg-gray-900 transition-all duration-300",
        isDetailOpen && currentCategory.id === category.id
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
        <div
          className={clsx(
            "relative w-11/12 max-w-5xl p-6 mx-auto rounded-lg shadow-lg border-2 transition-all duration-300",
            isDarkMode ? "bg-gray-900" : "bg-white border-gray-900",
            isDetailOpen && currentCategory.id === category.id
              ? "scale-100"
              : "scale-0 pointer-events-none"
          )}
          ref={detail}
        >
          <button
            className="absolute top-6 right-6 md:active:scale-90 transition"
            onClick={() => {
              setIsDetailOpen(false);
            }}
          >
            <XMarkIcon className="w-8" />
          </button>
          <h2
            className={clsx(
              "border-b-2 text-4xl pb-2",
              !isDarkMode && "border-gray-900"
            )}
          >
            {category.category_name}
          </h2>
          <ul className="text-xl h-96 overflow-y-scroll py-2">
            {articles.length ? (
              articles.map((article) => {
                return (
                  <li
                    key={article.id}
                    className="rounded-lg p-3 flex items-center justify-between"
                  >
                    <button
                      onClick={() => {
                        setIsDetailOpen(false);
                        router.push(`${FrontendRoutes.BLOG}/${article.id}`);
                      }}
                      className="md:hover:underline"
                    >
                      {article.title}
                    </button>
                    <span className="hidden md:inline-block">
                      {formatDateString(article.updated_at)}
                    </span>
                  </li>
                );
              })
            ) : (
              <li className="p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                <XMarkIcon className="w-9 inline-block mb-1.5 me-2" />
                找不到文章！
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ArticleCategoryMainDetail;
