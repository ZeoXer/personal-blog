"use client";

import Image from "next/image";
import LoadingGif from "../../imgs/loading-gif.gif";
import { useIsLoading } from "@/hooks/use-is-loading";
import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";

const FullScreenLoader = () => {
  const { isLoading } = useIsLoading();
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[99999] bg-opacity-50 transition-[opacity]",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
        isDarkMode ? "bg-gray-700" : "bg-gray-300"
      )}
    >
      <div className="fixed inset-0 z-[99999] backdrop-blur-sm flex items-center justify-center">
        <Image src={LoadingGif} alt="loading" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
