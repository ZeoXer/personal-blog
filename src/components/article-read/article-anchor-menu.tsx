import { useDarkMode } from "@/hooks/use-dark-mode";
import { Article } from "@/types/article";
import clsx from "clsx";
import { marked } from "marked";
import { useCallback, useEffect, useState } from "react";

type Tag = {
  id: number;
  tagName: string;
  tagContent: string;
};

const tagIndent = {
  H2: "pl-0",
  H3: "pl-4",
  H4: "pl-8",
  H5: "pl-12",
  H6: "pl-16",
};

const ArticleAnchorMenu = ({ article }: { article: Article }) => {
  const [tags, setTags] = useState([] as Tag[]);
  const { isDarkMode } = useDarkMode();

  const parseContentToHTMLAndGetHTags = useCallback(async () => {
    if (!article?.content) return;
    const htmlContent = await marked(article.content);
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlContent, "text/html");

    const hTags = Array.from(
      htmlDoc.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );
    const tagsList: Tag[] = hTags.map((tag, idx) => {
      return {
        id: idx,
        tagName: tag.tagName,
        tagContent: tag.textContent,
      } as Tag;
    });
    setTags(tagsList);
  }, [article?.content]);

  useEffect(() => {
    parseContentToHTMLAndGetHTags();
  }, [parseContentToHTMLAndGetHTags]);

  return (
    <aside className="hidden 2xl:block w-1/6">
      <div className="sticky top-4">
        <h3
          className={clsx(
            "text-2xl mb-4 px-3 py-2 border-s-2",
            !isDarkMode && "border-gray-900"
          )}
        >
          文章目錄
        </h3>
        <ul>
          {tags.map((tag) => {
            return (
              <li
                key={tag.id}
                className={clsx(
                  "text-xl py-2",
                  tagIndent[tag.tagName as keyof typeof tagIndent]
                )}
              >
                <a
                  href={`#${tag.tagContent}`}
                  className="md:hover:underline md:hover:translate-x-2 inline-block duration-300 truncate"
                >
                  {tag.tagContent}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default ArticleAnchorMenu;
