"use client";

import Search from "../search/search";
import ArticleCategoryManageList from "./article-category-manage-list";
import { ArticleCategoryManageProvider } from "./use-article-category-manage";

const ArticleManage = () => {
  return (
    <ArticleCategoryManageProvider>
      <section className="flex gap-4">
        <div className="w-full md:w-3/5 2xl:w-4/5">
          <ArticleCategoryManageList />
        </div>
        <div className="hidden md:block md:w-2/5 2xl:w-4/5">
          <Search />
        </div>
      </section>
    </ArticleCategoryManageProvider>
  );
};

export default ArticleManage;
