import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../../hooks/use-dark-mode";
import clsx from "clsx";
import { FrontendRoutes } from "../../routes";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/use-user";
import Link from "next/link";
import { clearAuthToken, isAuthenticated } from "@/data/client/token";
import { useRouter } from "next/navigation";
import { AuthPageProps } from "@/types/auth";
import { useAuth } from "@/hooks/use-auth";

const UserMenu: React.FC<AuthPageProps> = () => {
  const { isDarkMode } = useDarkMode();
  const { username } = useUser();
  const { isAuthorized, setIsAuthorized } = useAuth();
  const [isMenuShow, setIsMenuShow] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menu.current) return;

      if (!menu.current.contains(event.target as Node)) {
        setIsMenuShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <button className="relative" onClick={toggleMenu} ref={menu}>
      <UserCircleIcon
        className={clsx(
          "w-8 md:w-12 cursor-pointer md:active:scale-90 transition",
          isDarkMode ? "text-white" : "text-gray-500"
        )}
      />
      <div
        className={clsx(
          "absolute top-full right-0 rounded-md border list-none w-36 transition-all text-lg z-[100]",
          isMenuShow ? "opacity-100" : "opacity-0 pointer-events-none",
          isDarkMode ? "bg-gray-900 text-white" : "bg-white"
        )}
      >
        {isAuthorized ? (
          <>
            <li
              className={clsx(
                "py-2 rounded-t-md transition",
                isDarkMode ? "md:hover:bg-sky-800" : "md:hover:bg-gray-200"
              )}
            >
              <Link
                href={`${FrontendRoutes.PROFILE}/${username}`}
                className="block"
              >
                個人檔案
              </Link>
            </li>
            <li className="bg-white h-[0.5px]"></li>
            <li
              className={clsx(
                "py-2 transition",
                isDarkMode ? "md:hover:bg-sky-800" : "md:hover:bg-gray-200"
              )}
            >
              <Link href="/" className="block">
                管理文章
              </Link>
            </li>
            <li className="bg-white h-[0.5px]"></li>
            <li
              className={clsx(
                "py-2 rounded-b-md transition",
                isDarkMode ? "md:hover:bg-sky-800" : "md:hover:bg-gray-200"
              )}
            >
              <p
                onClick={() => {
                  clearAuthToken();
                  setIsAuthorized(false);
                  router.push(FrontendRoutes.HOME);
                }}
                className="block"
              >
                登出
              </p>
            </li>
          </>
        ) : (
          <li
            className={clsx(
              "py-2 md:active:scale-90 rounded-md transition",
              isDarkMode ? "md:hover:bg-sky-800" : "md:hover:bg-gray-200"
            )}
          >
            <Link href={FrontendRoutes.LOGIN} className="block">
              登入
            </Link>
          </li>
        )}
      </div>
    </button>
  );
};

export default UserMenu;
