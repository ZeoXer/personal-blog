import { useDarkMode } from "@/hooks/use-dark-mode";
import { KeyboardEvent } from "react";
import clsx from "clsx";
import { forwardRef } from "react";
import { useImage } from "@/hooks/use-image";

type TextareaProps = {
  label?: string;
  placeholder?: string;
  textareaClassName?: string;
  containerClassName?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, textareaClassName, containerClassName, error, ...textareaProps },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();
    const { addImage } = useImage();

    const insertContent = (content: string) => {
      if (ref && "current" in ref && ref.current) {
        // 從游標位置切開字串成兩邊
        const startPos = ref.current.selectionStart;
        const endPos = ref.current.selectionEnd;
        const textBefore = ref.current.value.substring(0, startPos);
        const textAfter = ref.current.value.substring(endPos);
        // 在兩個子字串中間插入兩個空格
        const newText = textBefore + content + textAfter;
        ref.current.value = newText;
        // 把游標移到兩個空格之後
        const newPos = startPos + 2;
        ref.current.setSelectionRange(newPos, newPos);
      }
    };

    const tabKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      insertContent("  ");
    };

    const handleSpecialKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      switch (e.key) {
        case "Tab":
          tabKey(e);
          break;
        default:
          break;
      }
    };

    const handlePaste = async (
      e: React.ClipboardEvent<HTMLTextAreaElement>
    ) => {
      const items = e.clipboardData.items;
      let file: File | null = null;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          file = items[i].getAsFile();
          break;
        }
      }

      if (!file) return true;

      const { data, status } = await addImage(file);
      if (status) {
        insertContent(`![${data.filename}](${data.path})`);
      } else {
        insertContent("Upload failed!");
      }
    };

    return (
      <div className={containerClassName}>
        {label && <label className="text-2xl block mb-2">{label}</label>}
        <div className="relative flex items-center">
          <textarea
            ref={ref}
            {...textareaProps}
            className={clsx(
              "border-2 rounded-lg px-2 py-1 resize-none",
              isDarkMode
                ? "bg-gray-900 text-white"
                : "bg-white border-gray-900",
              textareaClassName
            )}
            onKeyDown={handleSpecialKey}
            onPaste={handlePaste}
          />
        </div>
        {error && (
          <p className="text-red-500 text-md font-semibold mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
