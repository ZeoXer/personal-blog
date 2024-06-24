import { ArticleCategory } from "@/types/article";
import { createContext, useContext, useState } from "react";

type ArticleCategoryManageContextProps = {
  isCategoryModalOpen: boolean;
  newCategoryName: string;
  allCategory: ArticleCategory[];
  setIsCategoryModalOpen: (isOpen: boolean) => void;
  setNewCategoryName: (name: string) => void;
  setAllCategory: (category: ArticleCategory[]) => void;
};

const ArticleCategoryManageContext = createContext<
  ArticleCategoryManageContextProps | undefined
>(undefined);

const ArticleCategoryManageProvider = ({ children }: { children: any }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [allCategory, setAllCategory] = useState([] as ArticleCategory[]);

  const valueToShare: ArticleCategoryManageContextProps = {
    isCategoryModalOpen,
    newCategoryName,
    allCategory,
    setIsCategoryModalOpen,
    setNewCategoryName,
    setAllCategory,
  };

  return (
    <ArticleCategoryManageContext.Provider value={valueToShare}>
      {children}
    </ArticleCategoryManageContext.Provider>
  );
};

const useArticleCategoryManage = (): ArticleCategoryManageContextProps => {
  const context = useContext(ArticleCategoryManageContext);
  if (!context) {
    throw new Error("No Provider found!");
  }
  return context;
};

export { ArticleCategoryManageProvider, useArticleCategoryManage };
