import { createContext, useContext, useState } from "react";

type ArticleCategoryMainContextProps = {
  currentCategory: number;
  isDetailOpen: boolean;
  setCurrentCategory: (category: number) => void;
  setIsDetailOpen: (isOpen: boolean) => void;
};

const ArticleCategoryMainContext = createContext<
  ArticleCategoryMainContextProps | undefined
>(undefined);

const ArticleCategoryMainProvider = ({ children }: { children: any }) => {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const valueToShare: ArticleCategoryMainContextProps = {
    currentCategory,
    isDetailOpen,
    setCurrentCategory,
    setIsDetailOpen,
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
