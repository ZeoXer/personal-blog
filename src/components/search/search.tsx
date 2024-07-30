"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Input from "../form-fields/input";
import clsx from "clsx";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useCallback, useEffect, useState } from "react";
import { searchArticleByKeyword } from "@/data/article";
import { Article } from "@/types/article";
import Link from "next/link";
import { FrontendRoutes } from "@/routes";

const directToRoute = {
  PRIVATE_READ: FrontendRoutes.BLOG,
  PUBLIC_READ: FrontendRoutes.PUBLISH,
  WRITE: FrontendRoutes.ARTICLE,
};

const Search = ({
  directTo,
  authorName,
}: {
  directTo: keyof typeof directToRoute;
  authorName?: string;
}) => {
  const { isDarkMode } = useDarkMode();
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<Article[]>([]);

  const hightlightTitle = (title: string) => {
    const re = new RegExp(searchKeyword, "gi");
    if (title.match(re)) {
      const startIndex = title.indexOf(title.match(re)![0]);
      const endIndex = startIndex + searchKeyword.length;
      return (
        <>
          {title.slice(0, startIndex)}
          <span
            className={clsx(
              "font-semibold",
              isDarkMode ? "text-green-300" : "text-green-700"
            )}
          >
            {title.match(re)![0]}
          </span>
          {title.slice(endIndex)}
        </>
      );
    }
    return title;
  };

  const hightlightContent = (content: string) => {
    const re = new RegExp(searchKeyword, "gi");
    const matches = content.match(re);
    if (!matches || matches?.length === 0) return "";

    const matchPart: JSX.Element[] = [];
    let position = 0;
    for (let i = 0; i < matches.length; i++) {
      // 從完整內文裡從上次結束的位置找到匹配項的位置
      const matchIndex = content.indexOf(matches[i], position);
      // 擷取前後 10 個字元的位置
      const start = Math.max(0, matchIndex - 15);
      const end = Math.min(
        content.length,
        matchIndex + searchKeyword.length + 15
      );
      const prefix = start > 0 ? "..." : "";
      const suffix = end < content.length ? "..." : "";

      matchPart.push(
        <li className="my-1 opacity-60">
          {prefix}
          {content.slice(start, matchIndex)}
          <span
            className={clsx(
              "font-semibold",
              isDarkMode ? "text-green-300" : "text-green-700"
            )}
          >
            {matches[i]}
          </span>
          {content.slice(matchIndex + searchKeyword.length, end)}
          {suffix}
        </li>
      );

      // 更新下次搜尋的起始位置
      position = matchIndex + searchKeyword.length;
    }

    return matchPart.length >= 3 ? matchPart.slice(0, 3) : matchPart;
  };

  const searchArticle = useCallback(async () => {
    setIsSearching(true);
    if (searchKeyword.length <= 1) {
      setIsSearching(false);
      return;
    }

    const { data, status, message } = await searchArticleByKeyword(
      searchKeyword
    );

    if (!status) {
      console.error(message);
      setIsSearching(false);
      return;
    }

    setSearchResult(data);
    setIsSearching(false);
  }, [searchKeyword]);

  useEffect(() => {
    setSearchResult([]);
    const timerId = setTimeout(() => {
      searchArticle();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchArticle]);

  return (
    <div
      className={clsx(
        "border-2 p-4 rounded-lg",
        !isDarkMode && "border-gray-900"
      )}
    >
      <Input
        inputClassName="w-full"
        placeholder="搜尋內容..."
        icon={<MagnifyingGlassIcon className="w-6" />}
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
      <ul className={clsx("my-4 border-t-2", !isDarkMode && "border-gray-900")}>
        {searchResult.length > 0 ? (
          searchResult.map((article) => {
            return (
              <li
                key={article.id}
                className={clsx(
                  "my-3 border-2 p-2 rounded-lg",
                  !isDarkMode && "border-gray-900"
                )}
              >
                <Link
                  className="text-xl md:hover:underline"
                  href={`${directToRoute[directTo]}${
                    authorName && `/${authorName}`
                  }/${article.id}`}
                >
                  {hightlightTitle(article.title)}
                </Link>
                <ul>{hightlightContent(article.content)}</ul>
              </li>
            );
          })
        ) : (
          <li className="my-2 text-xl text-center">
            {isSearching ? "搜尋中..." : "無搜尋結果"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Search;
