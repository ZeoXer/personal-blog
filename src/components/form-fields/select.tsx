import { useDarkMode } from "@/hooks/use-dark-mode";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { forwardRef, useEffect, useRef, useState } from "react";

type SelectProps = {
  label?: string;
  optionList: string[];
  placeholder?: string;
  value: string;
  onChange: (e: any) => void;
  selectClassName?: string;
  containerClassName?: string;
  error?: string;
};

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({
    label,
    optionList,
    placeholder,
    value,
    onChange,
    selectClassName,
    containerClassName,
    error,
    ...selectProps
  }, ref) => {
    const { isDarkMode } = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const select = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!select.current) return;

        if (!select.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mouseup", handleClickOutside);

      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [setIsOpen]);

    return (
      <div className={containerClassName} ref={select}>
        {label && <label className="text-2xl block mb-2">{label}</label>}
        <div className="relative">
          <div
            className={clsx(
              "flex items-center justify-between border-2 py-2 px-3 cursor-pointer transition-[border-radius] duration-300",
              !isDarkMode && "border-gray-900",
              isOpen ? "rounded-t-lg" : "rounded-lg",
              !value && "text-gray-600",
              !selectClassName?.includes("text-") && "text-xl",
              selectClassName
            )}
            onClick={() => setIsOpen(!isOpen)}
            {...selectProps}
          >
            <p>{value || placeholder}</p>
            <span
              className={clsx(
                "transition cursor-pointer mt-0.5",
                isOpen ? "rotate-90" : "rotate-0",
                isDarkMode ? "text-white" : "text-gray-900"
              )}
            >
              <ChevronRightIcon className="w-6" />
            </span>
          </div>
          <div
            className={clsx(
              "absolute top-full rounded-b-lg border-x-2 border-b-2 w-full transition-[height, opacity] duration-300 overflow-y-scroll",
              isOpen ? "h-40 opacity-100" : "h-0 opacity-0 pointer-events-none",
              !selectClassName?.includes("text-") && "text-xl",
              isDarkMode
                ? "bg-gray-900 border-white"
                : "bg-white border-gray-900"
            )}
          >
            {optionList.map((option, idx) => {
              return (
                <p
                  key={idx}
                  className={clsx(
                    "py-1 px-2 cursor-pointer",
                    isDarkMode ? "md:hover:bg-sky-800" : "md:hover:bg-gray-200"
                  )}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </p>
              );
            })}
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-md font-semibold mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
