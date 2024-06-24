import { FrontendRoutes } from "@/routes";
import { LinkIcon } from "@heroicons/react/24/outline";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NotLoginIntro: React.FC = () => {
  return (
    <div className="absolute w-4/5 md:w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-xl md:text-3xl">
      <p className="mb-4 animate-move-from-bottom">
        這裡暫時還沒有內容！你可以...
      </p>
      <div
        className="flex items-center mb-4 animate-move-from-bottom"
        style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
      >
        <LockOpenIcon className="w-8 md:w-12 me-2" />
        <p>
          <Link href={FrontendRoutes.LOGIN} className="text-green-700">
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
        <p>
          <span className="hidden md:inline">透過使用者名稱</span>
          造訪他人的部落格
        </p>
      </div>
    </div>
  );
};

export default NotLoginIntro;
