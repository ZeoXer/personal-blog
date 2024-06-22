"use client";

import clsx from "clsx";
import { ChangeEvent, useEffect } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useUser } from "@/hooks/use-user";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import NumberCounter from "@/components/common/number-counter";
import WhiteLogo from "../../imgs/zeoxers-blog-logo-white-transparent.svg";
import NormalLogo from "../../imgs/zeoxers-blog-logo-transparent.svg";
import Image from "next/image";
import { useImage } from "@/hooks/use-image";

const PersonalInfo: React.FC = () => {
  const { username, email } = useUser();
  const { isDarkMode } = useDarkMode();
  const { getAvatar, addAvatar, deleteAvatar, avatar } = useImage();

  const handleAddAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await addAvatar(e);
    if (response.status) {
      getAvatar();
    }
  };

  const handleRemoveAvatar = async () => {
    const response = await deleteAvatar();
    if (response.status) {
      alert("頭像已移除");
    }
  };

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  return (
    <div
      className={clsx(
        "md:flex md:items-center p-4 absolute w-full 2xl:top-1/2 left-1/2 -translate-x-1/2 2xl:-translate-y-1/2 transition",
        isDarkMode ? "bg-gray-900" : "bg-white"
      )}
    >
      <div className="md:w-1/2">
        <div className="size-40 md:size-80 relative mx-auto mb-4 border-2 rounded-full">
          <Image
            src={avatar ? avatar : isDarkMode ? WhiteLogo : NormalLogo}
            alt="user"
            className="rounded-full"
            fill
            sizes="320px"
          />
        </div>
        <div>
          <div className="text-center mb-4">
            <label
              htmlFor="avatar-upload"
              className={clsx(
                "text-xl md:hover:underline cursor-pointer",
                isDarkMode ? "text-green-300" : "text-green-700"
              )}
            >
              上傳新頭像
            </label>
            <input
              type="file"
              onChange={handleAddAvatar}
              className="hidden"
              id="avatar-upload"
            />
          </div>
          <button
            className={clsx(
              "mb-4 text-xl md:hover:underline block mx-auto",
              isDarkMode ? "text-green-300" : "text-green-700"
            )}
            onClick={handleRemoveAvatar}
          >
            移除當前頭像
          </button>
        </div>
      </div>
      <div className="md:w-1/2">
        <div>
          <h2 className="text-5xl mb-10 text-center md:text-left">
            {username}
          </h2>
          <div className="text-2xl">
            <div className="mb-12">
              <div className="mb-4">
                <div className="flex items-center">
                  <EnvelopeIcon className="w-8 me-1 mb-1" />
                  <h3 className="mb-2">信箱</h3>
                </div>
                <p className="mb-2">{email}</p>
                <button
                  className={clsx(
                    "mb-4 text-xl md:hover:underline",
                    isDarkMode ? "text-green-300" : "text-green-700"
                  )}
                >
                  變更信箱
                </button>
              </div>
              <button
                className={clsx(
                  "text-xl md:hover:underline",
                  isDarkMode ? "text-green-300" : "text-green-700"
                )}
              >
                變更密碼
              </button>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <div
                className={clsx(
                  "border-2 p-3 rounded-md",
                  isDarkMode ? "border-white" : "border-black"
                )}
              >
                <h4>書本總數</h4>
                <p className="text-3xl">
                  <NumberCounter endNumber={5} />
                </p>
              </div>
              <div
                className={clsx(
                  "border-2 p-3 rounded-md",
                  isDarkMode ? "border-white" : "border-black"
                )}
              >
                <h4>文章總數</h4>
                <p className="text-3xl">
                  <NumberCounter endNumber={20} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
