"use client";

import { useUser } from "../../hooks/use-user";
import { useEffect } from "react";
import { useImage } from "@/hooks/use-image";
import { useAuth } from "@/hooks/use-auth";
import ArticleCategoryMain from "../articles-main/article-category-main";
import NotLoginIntro from "./not-login-intro";
import Search from "../search/search";

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
        <main className="p-5">
          <h2 className="mb-8 text-4xl">{username} 的文章集</h2>
          <section className="flex gap-4">
            <section className="w-full md:w-3/5 2xl:w-4/5">
              <ArticleCategoryMain />
            </section>
            <section className="hidden md:block md:w-2/5 2xl:w-1/5">
              <Search directTo="PRIVATE_READ" />
            </section>
          </section>
        </main>
      ) : (
        <NotLoginIntro />
      )}
    </main>
  );
};

export default Home;
