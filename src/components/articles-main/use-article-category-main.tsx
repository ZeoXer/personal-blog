"use client";

import { ArticleCategory } from "@/types/article";
import { createContext, useContext, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type ArticleCategoryMainContextProps = {
  authorName: string;
  currentCategory: Category;
  isDetailOpen: boolean;
  allCategory: ArticleCategory[];
  setAuthorName: (authorName: string) => void;
  setCurrentCategory: (category: Category) => void;
  setIsDetailOpen: (isOpen: boolean) => void;
  setAllCategory: (categories: ArticleCategory[]) => void;
};

const ArticleCategoryMainContext = createContext<
  ArticleCategoryMainContextProps | undefined
>(undefined);

const ArticleCategoryMainProvider = ({
  children,
  author = "",
}: {
  children: any;
  author?: string;
}) => {
  const [authorName, setAuthorName] = useState(author);
  const [currentCategory, setCurrentCategory] = useState({ id: -1, name: "" });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [allCategory, setAllCategory] = useState<ArticleCategory[]>([]);

  const valueToShare: ArticleCategoryMainContextProps = {
    authorName,
    currentCategory,
    isDetailOpen,
    allCategory,
    setAuthorName,
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
