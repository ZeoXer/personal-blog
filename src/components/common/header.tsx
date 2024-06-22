"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDarkMode } from "../../hooks/use-dark-mode";
import Logo from "./logo";
import UserMenu from "./user-menu";

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header>
      <div className="grid grid-cols-3 px-6 py-2 border-b">
        <div className=""></div>
        <Logo />
        <div className="flex items-center justify-end">
          <button onClick={toggleDarkMode} className="me-2">
            {isDarkMode ? (
              <SunIcon className="w-8 text-white md:w-11 cursor-pointer md:active:scale-90 transition" />
            ) : (
              <MoonIcon className="w-8 md:w-11 text-gray-500 cursor-pointer md:active:scale-90 transition" />
            )}
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
