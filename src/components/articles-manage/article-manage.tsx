"use client";

import ArticleCategoryManageList from "./article-category-manage-list";
import { ArticleCategoryManageProvider } from "./use-article-category-manage";

const ArticleManage = () => {
  return (
    <ArticleCategoryManageProvider>
      <div className="w-full md:w-4/5">
        <ArticleCategoryManageList />
      </div>
    </ArticleCategoryManageProvider>
  );
};

export default ArticleManage;
