"use client";

import { useUser } from "../../hooks/use-user";
import ArticleCategoryMainList from "../articles-main/article-category-main-list";
import { useEffect } from "react";
import { useImage } from "@/hooks/use-image";
import NotLoginIntro from "./not-login-intro";
import { isAuthenticated } from "@/data/client/token";

const Home: React.FC = () => {
  const { username, fetchUser } = useUser();
  const { getAvatar } = useImage();

  useEffect(() => {
    if (isAuthenticated()) {
      fetchUser();
      getAvatar();
    }
  }, [fetchUser, getAvatar]);

  return (
    <main>
      {isAuthenticated() ? (
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
