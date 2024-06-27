import { useDarkMode } from "@/hooks/use-dark-mode";
import { KeyboardEvent } from "react";
import clsx from "clsx";
import { forwardRef } from "react";

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

    const tabKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      alert("tab")
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
