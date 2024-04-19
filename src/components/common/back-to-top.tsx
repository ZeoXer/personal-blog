import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useDarkMode } from "../../hooks/use-dark-mode";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={clsx(
        "fixed bottom-2 right-2 transition",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={scrollToTop}
    >
      <ArrowUpCircleIcon
        className={clsx(
          "w-12 md:w-16 cursor-pointer md:active:scale-90",
          isDarkMode ? "text-green-700" : "text-green-300"
        )}
      />
    </button>
  );
};

export default BackToTop;
