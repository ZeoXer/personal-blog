import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";
import Link from "next/link";

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer
      className={clsx(
        "py-3 border-t-2 text-lg text-center",
        !isDarkMode && "border-gray-900"
      )}
    >
      <p>
        Copyright © {new Date().getFullYear()}{" "}
        <Link
          href="https://github.com/ZeoXer"
          className="font-semibold hover:underline"
          target="_black"
        >
          ZeoXer
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
