import ArticleCategoryMainList from "./article-category-main-list";
import { ArticleCategoryMainProvider } from "./use-article-category-main";

const ArticleCategoryMain = ({ authorName }: { authorName?: string }) => {
  return (
    <ArticleCategoryMainProvider author={authorName}>
      <ArticleCategoryMainList />
    </ArticleCategoryMainProvider>
  );
};

export default ArticleCategoryMain;
