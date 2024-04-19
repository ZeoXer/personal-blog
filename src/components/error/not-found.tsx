'use client'

import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";

const NotFound: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center">
        <h2 className="text-5xl mx-4 font-bold">404</h2>
        <p className="text-3xl">Not Found</p>
      </div>
      <a
        href="/"
        className={clsx(
          "block mt-4 text-2xl text-center rounded-md py-2 transition md:active:scale-90",
          isDarkMode ? "bg-green-700 text-white" : "bg-green-300"
        )}
      >
        <ArrowUturnLeftIcon className={"w-6 inline-block -mt-1 me-1"} />
        回到首頁
      </a>
    </div>
  );
};

export default NotFound;
