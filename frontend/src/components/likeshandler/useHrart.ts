//so baiscally ither heart k usestate funtion defined h
import { useState } from "react";

export const useHeart = (initialCount = 0, initialIsFilled = false) => {
  const [isFilled, setIsFilled] = useState(initialIsFilled);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setIsFilled(!isFilled);
    setCount((prevCount) => (isFilled ? prevCount - 1 : prevCount + 1));
  };

  return {
    isFilled,
    count,
    handleClick,
    setCount,
    setIsFilled,
  };
};
