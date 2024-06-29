import React, { useCallback, useEffect } from "react";
import ArticleCategoryMainBlock from "./article-category-main-block";
import { useArticleCategoryMain } from "./use-article-category-main";
import { getAllArticleCategory } from "@/data/article";
import { useIsLoading } from "@/hooks/use-is-loading";
import ArticleCategoryMainDetail from "./article-category-main-detail";

const ArticleCategoryMainList: React.FC = () => {
  const { allCategory, setAllCategory } = useArticleCategoryMain();
  const { setIsLoading } = useIsLoading();

  const handleGetAllArticleCategory = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = await getAllArticleCategory();
    setIsLoading(false);

    if (status) {
      setAllCategory(data);
    }
  }, [setIsLoading, setAllCategory]);

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
      {/* <ArticleCategoryMainDetail /> */}
    </>
  );
};

export default ArticleCategoryMainList;
