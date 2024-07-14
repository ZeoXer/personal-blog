"use client";

import React, { useCallback, useEffect } from "react";
import ArticleCategoryMainBlock from "./article-category-main-block";
import { useArticleCategoryMain } from "./use-article-category-main";
import {
  getAllArticleCategory,
  getAllPublicArticleCategory,
} from "@/data/article";
import { useIsLoading } from "@/hooks/use-is-loading";

const ArticleCategoryMainList = () => {
  const { authorName, allCategory, setAllCategory } = useArticleCategoryMain();
  const { setIsLoading } = useIsLoading();

  const handleGetAllArticleCategory = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = authorName
      ? await getAllPublicArticleCategory(authorName)
      : await getAllArticleCategory();
    setIsLoading(false);

    if (status) {
      setAllCategory(data);
    }
  }, [authorName, setIsLoading, setAllCategory]);

  useEffect(() => {
    handleGetAllArticleCategory();
  }, [handleGetAllArticleCategory]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {allCategory.map((category) => {
          return (
            <ArticleCategoryMainBlock key={category.id} category={category} />
          );
        })}
      </div>
    </>
  );
};

export default ArticleCategoryMainList;
