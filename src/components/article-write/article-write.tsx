"use client";

import Input from "../form-fields/input";
import { useState } from "react";
import Textarea from "../form-fields/textarea";
import MarkdownDisplay from "../common/markdown-display";
import clsx from "clsx";
import { useDarkMode } from "@/hooks/use-dark-mode";
import Select from "../form-fields/select";

const ArticleWrite = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const { isDarkMode } = useDarkMode();

  const catList = ["React", "Vue", "Angular", "Svelte", "Ember", "Backbone"];

  return (
    <main>
      <section className="w-full grid md:grid-cols-2 gap-4 mb-8">
        <Input
          inputClassName="text-3xl py-2 border-2 w-full"
          placeholder="文章標題..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="justify-end gap-6 hidden md:flex md:items-center">
          <Select
            optionList={catList}
            placeholder="選擇文章分類"
            value={category}
            onChange={(option) => setCategory(option)}
            selectClassName="w-60"
          />
          <button
            className={clsx(
              "text-xl px-7 py-2 rounded-lg md:active:scale-90 transition",
              isDarkMode ? "bg-orange-700" : "bg-orange-300"
            )}
          >
            圖片
          </button>
          <button
            className={clsx(
              "text-xl px-7 py-2 rounded-lg md:active:scale-90 transition",
              isDarkMode ? "bg-green-700" : "bg-green-300"
            )}
          >
            儲存
          </button>
        </div>
      </section>
      <section className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="文章內容..."
            textareaClassName="w-full h-[80vh] text-xl"
          />
        </div>
        <div className="hidden md:block">
          <MarkdownDisplay content={content} />
        </div>
      </section>
    </main>
  );
};

export default ArticleWrite;
