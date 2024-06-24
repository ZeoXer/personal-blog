import { useDarkMode } from "@/hooks/use-dark-mode";
import { ArticleCategory } from "@/types/article";
import {
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useArticleCategoryManage } from "./use-article-category-manage";

const ArticleCategoryManageBlock = ({ item }: { item: ArticleCategory }) => {
  const { isDarkMode } = useDarkMode();
  const { newCategoryName, setNewCategoryName } = useArticleCategoryManage();

  const handleEditCategory = (e: any) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={clsx(
          "flex justify-between items-center border-2 px-5 py-3 rounded-lg cursor-pointer",
          !isDarkMode && "border-gray-900"
        )}
        onClick={() => alert("click")}
      >
        <h3 className="text-2xl">{item.category_name}</h3>
        <div className="flex gap-4 items-center">
          <button
            className="md:active:scale-90 transition"
            onClick={handleEditCategory}
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <span className="md:hover:rotate-90 transition">
            <ChevronRightIcon className="w-7" />
          </span>
        </div>
      </div>
    </>
  );
};

export default ArticleCategoryManageBlock;
