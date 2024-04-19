"use client";

import { useEffect, useState } from "react";

type NumberCounterProps = {
  endNumber: number;
};

const NumberCounter: React.FC<NumberCounterProps> = ({ endNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        if (prevNumber < endNumber) {
          return prevNumber + 1;
        }
        clearInterval(interval); // 當數字達到結束數字時清除定時器
        return endNumber;
      });
    }, 50); // 每 100 毫秒增加一次數字

    return () => clearInterval(interval); // 清除定時器
  }, [endNumber]);

  return <span>{currentNumber}</span>;
};

export default NumberCounter;
