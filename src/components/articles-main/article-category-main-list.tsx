import React from "react";
import ArticleCategoryMain from "./article-category-main";
import ArticleCategoryMainDetail from "./article-category-main-detail";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { ArticleCategoryMainProvider } from "./use-article-category-main";

const fakeCatList: { id: number; name: string; icon?: any }[] = [
  {
    id: 1,
    name: "ReactJS",
  },
  {
    id: 2,
    name: "NextJS",
  },
  {
    id: 3,
    name: "TailwindCSS",
  },
  {
    id: 4,
    name: "NodeJS",
  },
  {
    id: 5,
    name: "GraphQL",
  },
  {
    id: 6,
    name: "TypeScript",
  },
];

const ArticleCategoryMainList: React.FC = () => {
  return (
    <ArticleCategoryMainProvider>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {fakeCatList.map((cat) => {
          return (
            <ArticleCategoryMain
              key={cat.id}
              id={cat.id}
              title={cat.name}
              icon={
                cat.icon ? cat.icon : <AcademicCapIcon className="size-20" />
              }
            />
          );
        })}
      </div>
      <ArticleCategoryMainDetail />
    </ArticleCategoryMainProvider>
  );
};

export default ArticleCategoryMainList;
