import { useDarkMode } from "@/hooks/use-dark-mode";
import { useArticleCategoryMain } from "./use-article-category-main";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ArticleCategoryMainDetail: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { isDetailOpen, setIsDetailOpen, setCurrentCategory } =
    useArticleCategoryMain();
  const detail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDetailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setCurrentCategory(-1);
    }
  }, [isDetailOpen, setCurrentCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!detail.current) return;

      if (!detail.current.contains(event.target as Node)) {
        setIsDetailOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [setIsDetailOpen]);

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-[1000] bg-opacity-50 bg-gray-900 transition-all duration-300",
        isDetailOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
        <div
          className={clsx(
            "relative w-11/12 max-w-5xl p-6 mx-auto rounded-lg shadow-lg border-2 transition-all duration-300",
            isDarkMode ? "bg-gray-900" : "bg-white border-gray-900",
            isDetailOpen ? "scale-100" : "scale-0 pointer-events-none"
          )}
          ref={detail}
        >
          <button
            className="absolute top-6 right-6 md:active:scale-90 transition"
            onClick={() => {
              setIsDetailOpen(false);
            }}
          >
            <XMarkIcon className="w-8" />
          </button>
          <h2
            className={clsx(
              "border-b-2 text-4xl pb-2",
              !isDarkMode && "border-gray-900"
            )}
          >
            ReactJS
          </h2>
          <ul className="text-xl max-h-96 overflow-y-scroll py-2">
            <li className="py-2 cursor-pointer md:hover:bg-white rounded-lg text-2xl">
              awefawefwea
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ArticleCategoryMainDetail;
