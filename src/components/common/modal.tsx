"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  children: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  setIsOpen,
}) => {
  const { isDarkMode } = useDarkMode();
  const [isClient, setIsClient] = useState(false);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!modal.current) return;

      if (!modal.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    isClient &&
    createPortal(
      <div
        className={clsx(
          "fixed inset-0 z-[1000] overflow-y-hidden bg-opacity-50 bg-gray-900 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
          <div
            className={clsx(
              "relative w-11/12 max-w-lg p-6 mx-auto rounded-lg shadow-lg border-2 transition-all duration-300",
              isDarkMode
                ? "bg-gray-900 border-white"
                : "bg-white border-gray-900",
              isOpen ? "scale-100" : "scale-0 pointer-events-none"
            )}
            ref={modal}
          >
            <button
              className="absolute top-6 right-6 md:active:scale-90 transition"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="w-8" />
            </button>
            <h2
              className={clsx(
                "border-b-2 text-3xl pb-2",
                !isDarkMode && "border-gray-900"
              )}
            >
              {title}
            </h2>
            <div className="pt-4 text-xl">{children}</div>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
