import Image from "next/image";
import { useDarkMode } from "@/hooks/use-dark-mode";
import WhiteLogo from "../../imgs/zeoxers-blog-logo-white-transparent.svg";
import NormalLogo from "../../imgs/zeoxers-blog-logo-transparent.svg";
import Link from "next/link";

const Logo: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <Link href="/" className="mx-auto">
      <Image
        src={isDarkMode ? WhiteLogo : NormalLogo}
        alt="logo"
        className="w-12 md:w-16 2xl:w-20"
        priority
      />
    </Link>
  );
};

export default Logo;
