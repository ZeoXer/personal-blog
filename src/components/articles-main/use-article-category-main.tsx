import { ArticleCategory } from "@/types/article";
import { createContext, useContext, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type ArticleCategoryMainContextProps = {
  currentCategory: Category;
  isDetailOpen: boolean;
  allCategory: ArticleCategory[];
  setCurrentCategory: (category: Category) => void;
  setIsDetailOpen: (isOpen: boolean) => void;
  setAllCategory: (categories: ArticleCategory[]) => void;
};

const ArticleCategoryMainContext = createContext<
  ArticleCategoryMainContextProps | undefined
>(undefined);

const ArticleCategoryMainProvider = ({ children }: { children: any }) => {
  const [currentCategory, setCurrentCategory] = useState({ id: -1, name: "" });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [allCategory, setAllCategory] = useState<ArticleCategory[]>([]);

  const valueToShare: ArticleCategoryMainContextProps = {
    currentCategory,
    isDetailOpen,
    allCategory,
    setCurrentCategory,
    setIsDetailOpen,
    setAllCategory,
  };

  return (
    <ArticleCategoryMainContext.Provider value={valueToShare}>
      {children}
    </ArticleCategoryMainContext.Provider>
  );
};

const useArticleCategoryMain = (): ArticleCategoryMainContextProps => {
  const context = useContext(ArticleCategoryMainContext);
  if (!context) {
    throw new Error("No Provider found!");
  }
  return context;
};

export { ArticleCategoryMainProvider, useArticleCategoryMain };
