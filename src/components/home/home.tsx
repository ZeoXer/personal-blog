"use client";

import { useUser } from "../../hooks/use-user";
import { useEffect } from "react";
import { useImage } from "@/hooks/use-image";
import { useAuth } from "@/hooks/use-auth";
import ArticleCategoryMain from "../articles-main/article-category-main";
import NotLoginIntro from "./not-login-intro";

const Home: React.FC = () => {
  const { username, fetchUser } = useUser();
  const { isLogin } = useAuth();
  const { avatar, getAvatar } = useImage();

  useEffect(() => {
    if (isLogin) {
      fetchUser();
      getAvatar();
    }
  }, [isLogin, avatar, username, fetchUser, getAvatar]);

  return (
    <main>
      {isLogin ? (
        <div className="p-5">
          <h2 className="mb-8 text-4xl">{username} 的文章集</h2>
          <div className="w-full md:w-4/5">
            <ArticleCategoryMain />
          </div>
        </div>
      ) : (
        <NotLoginIntro />
      )}
    </main>
  );
};

export default Home;
