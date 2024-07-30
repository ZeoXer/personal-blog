"use client";

import { useCallback, useEffect } from "react";
import { getAllArticleCategory } from "@/data/article";
import ArticleCategoryManageBlock from "./article-category-manage-block";
import { useArticleCategoryManage } from "./use-article-category-manage";
import { useIsLoading } from "@/hooks/use-is-loading";

const ArticleCategoryManageList: React.FC = () => {
  const { allCategory, setAllCategory } = useArticleCategoryManage();
  const { setIsLoading } = useIsLoading();

  const handleGetAllArticleCategory = useCallback(async () => {
    setIsLoading(true);
    const { status, data } = await getAllArticleCategory();
    setIsLoading(false);
    if (status) setAllCategory(data);
  }, [setAllCategory, setIsLoading]);

  useEffect(() => {
    handleGetAllArticleCategory();
  }, [handleGetAllArticleCategory]);

  return (
    <main>
      <section className="grid gap-4">
        {allCategory.map((item) => {
          return <ArticleCategoryManageBlock key={item.id} item={item} />;
        })}
      </section>
    </main>
  );
};

export default ArticleCategoryManageList;
