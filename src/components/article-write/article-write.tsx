"use client";

import Input from "../form-fields/input";
import { useCallback, useEffect, useRef, useState } from "react";
import Textarea from "../form-fields/textarea";
import MarkdownDisplay from "../common/markdown-display";
import clsx from "clsx";
import { useDarkMode } from "@/hooks/use-dark-mode";
import Select from "../form-fields/select";
import { ArticleCategory } from "@/types/article";
import {
  addArticle,
  getAllArticleCategory,
  getArticle,
  updateArticle,
} from "@/data/article";
import { useRouter } from "next/navigation";
import { FrontendRoutes } from "@/routes";
import { useIsLoading } from "@/hooks/use-is-loading";
import { BookOpenIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const ArticleWrite = ({ articleId }: { articleId?: number }) => {
  const [allCategory, setAllCategory] = useState([] as ArticleCategory[]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [content, setContent] = useState("");
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  const { setIsLoading } = useIsLoading();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGetAllArticleCategory = useCallback(async () => {
    if (allCategory.length) return;
    const { status, data } = await getAllArticleCategory();
    if (status) setAllCategory(data);
  }, [allCategory]);

  const handleAddArticle = async () => {
    setIsLoading(true);
    const categoryId = allCategory.find(
      (c) => c.category_name === category
    )?.id;

    if (!categoryId) {
      console.log("Category not found");
      return;
    }

    const { status } = await addArticle(title, content, categoryId);
    setIsLoading(false);

    if (status) {
      router.push(FrontendRoutes.ARTICLES);
    }
  };

  const handleUpdateArticle = async () => {
    if (!articleId) return;
    setIsLoading(true);

    const categoryId = allCategory.find(
      (c) => c.category_name === category
    )?.id;

    if (!categoryId) {
      console.log("Category not found");
      return;
    }

    const { status } = await updateArticle(
      articleId,
      title,
      content,
      isPublished,
      categoryId
    );
    setIsLoading(false);

    if (status) {
      router.push(FrontendRoutes.ARTICLES);
    }
  };

  const handleGetAritcle = useCallback(async () => {
    if (!articleId) return;
    setIsLoading(true);

    const { status, data } = await getArticle(articleId);
    if (!status) return;

    // 取得文章的分類名稱
    const categoryName = allCategory.find(
      (c) => c.id === data.category_id
    )?.category_name;
    if (!allCategory.length || !categoryName) return;

    // 將文章的標題、內容和分類帶入
    setTitle(data.title);
    setContent(data.content);
    setIsPublished(data.is_published);
    setCategory(categoryName);
    setIsLoading(false);
  }, [articleId, allCategory, setIsLoading]);

  useEffect(() => {
    handleGetAllArticleCategory();
    if (articleId) handleGetAritcle();
  }, [articleId, handleGetAritcle, handleGetAllArticleCategory]);

  return (
    <main>
      <section className="w-full grid md:grid-cols-2 gap-4 mb-8">
        <Input
          inputClassName="text-3xl py-2 border-2 w-full"
          placeholder="文章標題..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="justify-between md:justify-end gap-6 flex md:items-center relative z-10">
          <Select
            optionList={allCategory.map((category) => category.category_name)}
            placeholder="選擇文章分類"
            value={category}
            onChange={(option) => setCategory(option)}
            selectClassName="w-52 md:w-60"
          />
          <button
            className={clsx(
              "text-xl w-32 py-2 rounded-lg md:active:scale-90 transition border-2 hidden md:flex items-center gap-1 justify-center ",
              !isDarkMode && "border-gray-900"
            )}
            onClick={() => setIsPublished(!isPublished)}
          >
            {isPublished ? (
              <BookOpenIcon className="w-7" />
            ) : (
              <LockClosedIcon className="w-7" />
            )}
            {isPublished ? "公開" : "不公開"}
          </button>
          <button
            className={clsx(
              "text-xl px-7 py-2 rounded-lg md:active:scale-90 transition disabled:opacity-50 disable:pointer-events-none disabled:cursor-not-allowed",
              isDarkMode ? "bg-green-700" : "bg-green-300"
            )}
            disabled={!title || !category || !content}
            onClick={articleId ? handleUpdateArticle : handleAddArticle}
          >
            {articleId ? "儲存" : "建立"}
          </button>
        </div>
      </section>
      <section className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="文章內容..."
            textareaClassName="w-full h-[80vh] text-xl"
          />
        </div>
        <section
          className={clsx(
            "h-[80vh] overflow-y-scroll border-2 rounded-lg px-4 py-2 hidden md:block",
            !isDarkMode && "border-gray-900"
          )}
        >
          <MarkdownDisplay content={content} />
        </section>
      </section>
    </main>
  );
};

export default ArticleWrite;
