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
import { CSSProperties, useRef } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";

const MarkdownDisplay = ({ content }: { content: string }) => {
  const syntaxHighlighterRef = useRef<SyntaxHighlighter>(null);
  const { isDarkMode } = useDarkMode();

  const hTagStyle = (fontSize: string): CSSProperties => {
    return {
      fontSize: fontSize,
      fontWeight: "700",
      marginBottom: "8px",
    };
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className={clsx(
        "text-xl h-[80vh] overflow-y-scroll border-2 leading-relaxed rounded-lg px-4 py-2",
        !isDarkMode && "border-gray-900"
      )}
      components={{
        h1(props) {
          const { children, ...rest } = props;
          return (
            <h1 style={hTagStyle("40px")} id={children?.toString()} {...rest}>
              {children}
            </h1>
          );
        },
        h2(props) {
          return <h2 style={hTagStyle("36px")} {...props} />;
        },
        h3(props) {
          return <h3 style={hTagStyle("32px")} {...props} />;
        },
        h4(props) {
          return <h4 style={hTagStyle("28px")} {...props} />;
        },
        h5(props) {
          return <h5 style={hTagStyle("24px")} {...props} />;
        },
        h6(props) {
          return <h6 style={hTagStyle("23px")} {...props} />;
        },
        p(props) {
          return <p className="mb-[12px]" {...props} />;
        },
        a(props) {
          return (
            <a
              {...props}
              className="text-sky-600 md:hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {props.children}
            </a>
          );
        },
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
              style={isDarkMode ? agate : githubGist}
              useInlineStyles={true}
              customStyle={{
                borderRadius: "10px",
                margin: "16px 0",
                boxShadow: "2px 2px 5px 0 rgba(0,0,0,0.2)",
              }}
              ref={syntaxHighlighterRef}
            >
              {codeContent}
            </SyntaxHighlighter>
          ) : (
            <code
              {...rest}
              style={isDarkMode ? agate : githubGist}
              className={clsx("rounded-md bg-gray-400 px-1 py-0.5", className)}
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
