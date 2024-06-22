"use client";

import { LinkIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../hooks/use-user";
import BookList from "../books/book-list";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { FrontendRoutes } from "@/routes";
import clsx from "clsx";
import { useDarkMode } from "@/hooks/use-dark-mode";
import Link from "next/link";
import { useImage } from "@/hooks/use-image";

const Home: React.FC = () => {
  const { username, fetchUser } = useUser();
  const { isAuthorized } = useAuth();
  const { isDarkMode } = useDarkMode();
  const { getAvatar } = useImage();

  useEffect(() => {
    if (isAuthorized) {
      fetchUser();
      getAvatar();
    }
  }, [isAuthorized, fetchUser, getAvatar]);

  return (
    <main>
      {isAuthorized ? (
        <div className="p-5">
          <h2 className="mb-4 text-4xl">{username} 的書櫃</h2>
          <div className="w-full md:w-4/5">
            <BookList />
          </div>
        </div>
      ) : (
        <div className="absolute w-4/5 md:w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-base md:text-3xl">
          <p className="mb-4 animate-move-from-bottom">
            這裡暫時還沒有內容！你可以...
          </p>
          <div
            className="flex items-center mb-4 animate-move-from-bottom"
            style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
          >
            <LockOpenIcon className="w-8 md:w-12 me-2" />
            <p>
              <Link
                href={FrontendRoutes.LOGIN}
                className="text-green-700"
              >
                登入
              </Link>
              自己的部落格首頁<span className="ms-4">或</span>{" "}
            </p>
          </div>
          <div
            className="flex items-center animate-move-from-bottom"
            style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
          >
            <LinkIcon className="w-8 md:w-12 me-2" />
            <p>透過使用者名稱造訪他人的部落格</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
