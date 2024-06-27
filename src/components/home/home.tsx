"use client";

import { useUser } from "../../hooks/use-user";
import ArticleCategoryMainList from "../articles-main/article-category-main-list";
import { useEffect } from "react";
import { useImage } from "@/hooks/use-image";
import NotLoginIntro from "./not-login-intro";
import { useAuth } from "@/hooks/use-auth";

const Home: React.FC = () => {
  const { username, fetchUser } = useUser();
  const { isLogin } = useAuth();
  const { getAvatar } = useImage();

  useEffect(() => {
    if (isLogin) {
      fetchUser();
      getAvatar();
    }
  }, [isLogin, fetchUser, getAvatar]);

  return (
    <main>
      {isLogin ? (
        <div className="p-5">
          <h2 className="mb-8 text-4xl">{username} 的文章集</h2>
          <div className="w-full md:w-4/5">
            <ArticleCategoryMainList />
          </div>
        </div>
      ) : (
        <NotLoginIntro />
      )}
    </main>
  );
};

export default Home;
