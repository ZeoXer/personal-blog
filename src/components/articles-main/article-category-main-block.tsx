import clsx from "clsx";
import { useDarkMode } from "../../hooks/use-dark-mode";
import { useArticleCategoryMain } from "./use-article-category-main";
import { ArticleCategory } from "@/types/article";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import ArticleCategoryMainDetail from "./article-category-main-detail";

const ArticleCategoryMainBlock = ({
  category,
}: {
  category: ArticleCategory;
}) => {
  const { isDarkMode } = useDarkMode();
  const { currentCategory, setCurrentCategory, setIsDetailOpen } =
    useArticleCategoryMain();

  return (
    <>
      <div
        className={clsx(
          "w-full max-w-[240px] border-2 rounded-lg md:hover:scale-110 transition-all cursor-pointer p-2",
          isDarkMode ? "bg-gray-900" : "bg-white border-gray-900",
          currentCategory.id === category.id ? "scale-0" : "scale-100"
        )}
        onClick={() => {
          setIsDetailOpen(true);
          setCurrentCategory({ id: category.id, name: category.category_name });
        }}
      >
        <h3 className="text-center text-2xl">{category.category_name}</h3>
        <div className="flex items-center justify-center py-8">
          {<AcademicCapIcon className="w-20" />}
        </div>
      </div>
      <ArticleCategoryMainDetail category={category} />
    </>
  );
};

export default ArticleCategoryMainBlock;
