import clsx from "clsx";
import { useDarkMode } from "../../hooks/use-dark-mode";
import { useArticleCategoryMain } from "./use-article-category-main";

type ArticleCategoryMainProps = {
  id: number;
  title: string;
  icon?: any;
};

const ArticleCategoryMain: React.FC<ArticleCategoryMainProps> = ({
  id,
  title,
  icon,
}) => {
  const { isDarkMode } = useDarkMode();
  const { currentCategory, setCurrentCategory, setIsDetailOpen } =
    useArticleCategoryMain();

  return (
    <div
      className={clsx(
        "w-full max-w-[240px] border-2 rounded-lg md:hover:scale-110 transition-all cursor-pointer p-2",
        isDarkMode ? "bg-gray-900" : "bg-white border-gray-900",
        currentCategory === id ? "scale-0" : "scale-100"
      )}
      onClick={() => {
        setIsDetailOpen(true);
        setCurrentCategory(id);
      }}
    >
      <h3 className="text-center text-2xl">{title}</h3>
      <div className="flex items-center justify-center py-8">
        {icon && icon}
      </div>
    </div>
  );
};

export default ArticleCategoryMain;
