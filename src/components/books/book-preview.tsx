import clsx from "clsx";
import { useDarkMode } from "../../hooks/use-dark-mode";
import styles from "../../styles/book-preview.module.css";

const BookPreview: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={clsx("w-44 h-60", styles["book"])}>
      <div
        className={clsx(
          isDarkMode ? "bg-green-700" : "bg-green-300",
          styles["book-cover"]
        )}
      >
        <div className="absolute text-xl left-1/2 -translate-x-1/2 top-4">
          Reactjs
        </div>
        <div className={styles["effect"]}></div>
        <div className={styles["light"]}></div>
      </div>
      <div className={styles["book-inside"]}></div>
    </div>
  );
};

export default BookPreview;
