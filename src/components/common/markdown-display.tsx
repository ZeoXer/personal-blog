"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  agate,
  githubGist,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useRef } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";

const MarkdownDisplay = ({ content }: { content: string }) => {
  const syntaxHighlighterRef = useRef<SyntaxHighlighter>(null);
  const { isDarkMode } = useDarkMode();

  const handleContentFormat = (content: string) => {
    const codeBlockRegex = /```(\w+)\n\n/;
    content = content.replace(/\n/g, "\n\n");
    if (codeBlockRegex.test(content)) {
      content = content.replace(codeBlockRegex, "/```(w+)\n/");
    }

    return content;
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className={clsx(
        "text-xl h-[80vh] overflow-y-scroll border-2 leading-relaxed rounded-lg p-2",
        !isDarkMode && "border-gray-900"
      )}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const codeContent = String(children).startsWith("\n")
            ? String(children).substring(1).replace(/\n\n/g, "\n")
            : String(children).replace(/\n\n/g, "\n");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={isDarkMode ? githubGist : agate}
              useInlineStyles={true}
              customStyle={{ borderRadius: "10px", margin: "16px 0" }}
              ref={syntaxHighlighterRef}
            >
              {codeContent}
            </SyntaxHighlighter>
          ) : (
            <code
              {...rest}
              style={isDarkMode ? agate : githubGist}
              className={className}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content.replace(/\n/g, "\n\n")}
    </Markdown>
  );
};

export default MarkdownDisplay;
