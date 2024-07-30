"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";
import Modal from "../common/modal";
import Input from "../form-fields/input";
import { useArticleCategoryManage } from "./use-article-category-manage";
import { addArticleCategory, getAllArticleCategory } from "@/data/article";
import clsx from "clsx";
import { useIsLoading } from "@/hooks/use-is-loading";
import { useCallback } from "react";

const ArticleCategoryManageAddModal = () => {
  const { isDarkMode } = useDarkMode();
  const { setAllCategory } = useArticleCategoryManage();
  const { setIsLoading } = useIsLoading();
  const {
    isCategoryModalOpen,
    newCategoryName,
    setNewCategoryName,
    setIsCategoryModalOpen,
  } = useArticleCategoryManage();

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleGetAllArticleCategory = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = await getAllArticleCategory();
    setIsLoading(false);
    if (status) setAllCategory(data);
  }, [setAllCategory, setIsLoading]);

  const handleAddArticleCategory = async () => {
    const response = await addArticleCategory(newCategoryName);
    if (response.status) {
      closeCategoryModal();
      handleGetAllArticleCategory();
    }
  };

  return (
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
  );
};

export default ArticleCategoryManageAddModal;
