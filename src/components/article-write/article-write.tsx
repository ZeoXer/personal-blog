"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, docco, schoolBook, darkula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Input from "../form-fields/input";
import { useRef, useState } from "react";

const ArticleWrite = () => {
  const [content, setContent] = useState("");
  const syntaxHighlighterRef = useRef<SyntaxHighlighter>(null);

  return (
    <main>
      <section className="w-full flex">
        <Input inputClassName="text-3xl py-2 w-1/2 border-2" />
        <div>分類</div>
        <button>圖片</button>
        <button className="text-xl">儲存</button>
      </section>
      <section className="text-2xl grid grid-cols-1 md:grid-cols-2">
        <div className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="hidden md:block">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={darkula}
                    customStyle={{ borderRadius: "10px" }}
                    ref={syntaxHighlighterRef}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} style={dark} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </Markdown>
        </div>
      </section>
    </main>
  );
};

export default ArticleWrite;
