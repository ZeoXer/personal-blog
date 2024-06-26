import clsx from "clsx";
import { useDarkMode } from "../../hooks/use-dark-mode";
import { ReactNode, forwardRef } from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  icon?: ReactNode;
  inputClassName?: string;
  containerClassName?: string;
  error?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      icon,
      error,
      inputClassName,
      containerClassName,
      ...inputProps
    },
    ref
  ) => {
    const { isDarkMode } = useDarkMode();

    return (
      <div className={containerClassName}>
        {label && <label className="text-2xl block mb-2">{label}</label>}
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={type}
            {...inputProps}
            className={clsx(
              "border-2 rounded-lg px-2 py-2",
              isDarkMode
                ? "bg-gray-900 text-white"
                : "bg-white border-gray-900",
              icon && "ps-10",
              inputClassName,
              !inputClassName?.includes("text-") && "text-xl"
            )}
          />
          {icon && (
            <div className="h-full absolute left-2 top-0 flex justify-center items-center">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-md font-semibold mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
