import ArticleCategoryMainList from "./article-category-main-list";
import { ArticleCategoryMainProvider } from "./use-article-category-main";

const ArticleCategoryMain = () => {
  return (
    <ArticleCategoryMainProvider>
      <ArticleCategoryMainList />
    </ArticleCategoryMainProvider>
  );
};

export default ArticleCategoryMain;
