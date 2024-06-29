"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect } from "react";
import Modal from "../common/modal";
import Input from "../form-fields/input";
import { addArticleCategory, getAllArticleCategory } from "@/data/article";
import ArticleCategoryManageBlock from "./article-category-manage-block";
import { useArticleCategoryManage } from "./use-article-category-manage";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";
import { useIsLoading } from "@/hooks/use-is-loading";

const ArticleCategoryManageList: React.FC = () => {
  const {
    isCategoryModalOpen,
    newCategoryName,
    allCategory,
    setNewCategoryName,
    setAllCategory,
    setIsCategoryModalOpen,
  } = useArticleCategoryManage();
  const { isDarkMode } = useDarkMode();
  const { setIsLoading } = useIsLoading();

  const openCategoryModal = () => {
    setNewCategoryName("");
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleAddArticleCategory = async () => {
    const response = await addArticleCategory(newCategoryName);
    if (response.status) {
      closeCategoryModal();
      handleGetAllArticleCategory();
    }
  };

  const handleGetAllArticleCategory = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = await getAllArticleCategory();
    setIsLoading(false);
    if (status) setAllCategory(data);
  }, [setAllCategory, setIsLoading]);

  useEffect(() => {
    handleGetAllArticleCategory();
  }, [handleGetAllArticleCategory]);

  return (
    <main>
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
      <section className="grid gap-4">
        {allCategory.map((item) => {
          return <ArticleCategoryManageBlock key={item.id} item={item} />;
        })}
      </section>
      <Modal
        title="新增分類"
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
      >
        <Input
          label="分類名稱"
          inputClassName="w-full"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            className={clsx(
              "text-xl flex items-center gap-1 px-3 py-1 border-2 rounded-lg md:active:scale-90 transition",
              isDarkMode
                ? " text-white border-white bg-gray-900"
                : "border-gray-900"
            )}
            onClick={handleAddArticleCategory}
          >
            新增
          </button>
          <button
            className={clsx(
              "text-xl flex items-center gap-1 px-3 py-1 border-2 rounded-lg md:active:scale-90 transition",
              isDarkMode
                ? " text-white border-white bg-gray-900"
                : "border-gray-900"
            )}
            onClick={closeCategoryModal}
          >
            取消
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default ArticleCategoryManageList;
