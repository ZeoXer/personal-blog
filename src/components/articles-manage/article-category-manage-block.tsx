import { useDarkMode } from "@/hooks/use-dark-mode";
import { Article, ArticleCategory } from "@/types/article";
import {
  CheckIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Input from "../form-fields/input";
import { useState } from "react";
import {
  getAllArticleCategory,
  getArticlesByCategory,
  updateArticleCategory,
} from "@/data/article";
import { useArticleCategoryManage } from "./use-article-category-manage";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";
import { formatDateString } from "@/utils";

const ArticleCategoryManageBlock = ({ item }: { item: ArticleCategory }) => {
  const { isDarkMode } = useDarkMode();
  const { setAllCategory } = useArticleCategoryManage();
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(item.category_name);
  const [isSpanned, setIsSpanned] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [articles, setArticles] = useState([] as Article[]);

  const handleEditCategory = async (e: any) => {
    e.stopPropagation();
    const { status } = await updateArticleCategory(item.id, editName);
    if (status) {
      const { data } = await getAllArticleCategory();
      setAllCategory(data);
      setIsEdit(false);
    }
  };

  const handleGetArticles = async (categoryId: number) => {
    setIsFetching(true);
    const { status, data } = await getArticlesByCategory(categoryId);
    setIsFetching(false);
    if (status) setArticles(data);
  };

  return (
    <>
      <div
        className={clsx(
          "flex justify-between items-center border-2 px-5 py-3 cursor-pointer transition-all duration-300",
          !isDarkMode && "border-gray-900",
          isSpanned ? "rounded-t-lg" : "rounded-lg"
        )}
        onClick={() => {
          if (!isSpanned && !articles.length) {
            handleGetArticles(item.id);
          }
          setIsSpanned(!isSpanned);
        }}
      >
        <div className="relative w-2/3 max-w-60">
          <Input
            inputClassName={clsx(
              "text-2xl w-full py-2 transition-[border-color, padding] duration-300 border-2",
              isEdit ? "ps-10" : "border-transparent pointer-events-none"
            )}
            readOnly={!isEdit}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={clsx(
              "md:active:scale-90 hidden md:block absolute transition-[left] duration-300 top-1/2 -translate-y-1/2",
              isEdit ? "left-2" : "left-full"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsEdit(true);
            }}
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <div
            className={clsx(
              "absolute flex items-center gap-2 ms-2 left-full top-1/2 -translate-y-1/2 transition duration-300",
              isEdit ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <button
              className={clsx(
                "rounded-lg md:hover:active:scale-90 transition-[background-color] duration-300",
                isDarkMode ? "bg-green-700" : "bg-green-300"
              )}
              onClick={handleEditCategory}
            >
              <CheckIcon className="w-7" />
            </button>
            <button
              className={clsx(
                "rounded-lg md:hover:active:scale-90 transition-[background-color] duration-300",
                isDarkMode ? "bg-orange-700" : "bg-orange-300"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setEditName(item.category_name);
                setIsEdit(false);
              }}
            >
              <XMarkIcon className="w-7" />
            </button>
          </div>
        </div>
        <span
          className={clsx(
            "transition-transform duration-300",
            isSpanned ? "rotate-90" : "rotate-0"
          )}
        >
          <ChevronRightIcon className="w-7" />
        </span>
      </div>
      <ul
        className={clsx(
          "rounded-b-lg -mt-4 px-5 py-2 transition-all overflow-y-scroll border-x-2 border-b-2 duration-300 text-xl relative",
          !isDarkMode && "border-gray-900",
          isSpanned ? "h-80 opacity-100" : "h-0 opacity-0 pointer-events-none"
        )}
      >
        {isFetching ? (
          <li className="p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
            <MagnifyingGlassIcon className="w-9 inline-block mb-1.5 me-2" />
            搜尋中...
          </li>
        ) : articles.length ? (
          articles.map((article) => {
            return (
              <li
                key={article.id}
                className="rounded-lg p-3 flex items-center justify-between"
              >
                <Link
                  href={`${FrontendRoutes.ARTICLE}/${article.id}`}
                  className="md:hover:underline"
                >
                  {article.title}
                </Link>
                <span>{formatDateString(article.updated_at)}</span>
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
    </>
  );
};

export default ArticleCategoryManageBlock;
