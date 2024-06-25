import { useDarkMode } from "@/hooks/use-dark-mode";
import { ArticleCategory } from "@/types/article";
import {
  CheckBadgeIcon,
  CheckIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useArticleCategoryManage } from "./use-article-category-manage";
import Input from "../form-fields/input";
import { useState } from "react";

const ArticleCategoryManageBlock = ({ item }: { item: ArticleCategory }) => {
  const { isDarkMode } = useDarkMode();
  const { newCategoryName, setNewCategoryName } = useArticleCategoryManage();
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(item.category_name);
  const [isSpanned, setIsSpanned] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "flex justify-between items-center border-2 px-5 py-2 cursor-pointer transition-all duration-300",
          !isDarkMode && "border-gray-900",
          isSpanned ? "rounded-t-lg" : "rounded-lg"
        )}
        onClick={() => setIsSpanned(!isSpanned)}
      >
        <div className="relative w-2/3 max-w-60 -mt-1">
          <Input
            label=""
            inputClassName={clsx(
              "text-2xl w-full py-2 transition-[border-color, padding] duration-300 border-2",
              isEdit ? "ps-10" : "border-transparent pointer-events-none"
            )}
            readOnly={!isEdit}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={clsx(
              "md:active:scale-90 hidden md:block absolute transition-[left] duration-300 top-1/2 -translate-y-1/2",
              isEdit ? "left-2" : "left-full"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsEdit(true);
            }}
          >
            <PencilSquareIcon className="w-7 mt-1" />
          </button>
          <div
            className={clsx(
              "absolute flex items-center gap-2 ms-2 mt-0.5 left-full top-1/2 -translate-y-1/2 transition duration-300",
              isEdit ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <button
              className={clsx(
                "border-2 rounded-lg md:hover:active:scale-90 transition",
                !isDarkMode && "border-gray-900"
              )}
            >
              <CheckIcon className="w-7" />
            </button>
            <button
              className={clsx(
                "border-2 rounded-lg md:hover:active:scale-90 transition",
                !isDarkMode && "border-gray-900"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setEditName(item.category_name);
                setIsEdit(false);
              }}
            >
              <XMarkIcon className="w-7" />
            </button>
          </div>
        </div>
        <span
          className={clsx(
            "transition-transform duration-300",
            isSpanned ? "rotate-90" : "rotate-0"
          )}
        >
          <ChevronRightIcon className="w-7" />
        </span>
      </div>
      <ul
        className={clsx(
          "rounded-b-lg -mt-4 px-5 py-2 transition-all overflow-y-scroll border-x-2 border-b-2 duration-300 text-xl",
          !isDarkMode && "border-gray-900",
          isSpanned ? "h-80 opacity-100" : "h-0 opacity-0 pointer-events-none"
        )}
      >
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
        <li className="py-2">文章1</li>
      </ul>
    </>
  );
};

export default ArticleCategoryManageBlock;
