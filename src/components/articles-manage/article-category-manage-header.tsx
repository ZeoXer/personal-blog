"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";
import { useArticleCategoryManage } from "./use-article-category-manage";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";
import clsx from "clsx";

const ArticleCategoryManageHeader = () => {
  const { isDarkMode } = useDarkMode();
  const { setNewCategoryName, setIsCategoryModalOpen } =
    useArticleCategoryManage();

  const openCategoryModal = () => {
    setNewCategoryName("");
    setIsCategoryModalOpen(true);
  };

  return (
    <>
      <section className="flex justify-end gap-4 mb-8">
        <button
          className={clsx(
            "group text-xl flex items-center gap-1 px-3 py-2 border-2 rounded-lg md:active:scale-90 transition",
            isDarkMode
              ? " text-white border-white bg-gray-900"
              : "border-gray-900"
          )}
          onClick={openCategoryModal}
        >
          <PlusIcon className="w-6 md:group-hover:rotate-90 transition" />
          新增分類
        </button>
        <Link
          href={FrontendRoutes.ARTICLE}
          className={clsx(
            "group text-xl flex items-center gap-1 px-3 py-2 border-2 rounded-lg md:active:scale-90 transition",
            isDarkMode
              ? " text-white border-white bg-gray-900"
              : "border-gray-900"
          )}
        >
          <PencilIcon className="w-6 md:group-hover:-rotate-45 transition" />
          寫文章
        </Link>
      </section>
    </>
  );
};

export default ArticleCategoryManageHeader;
