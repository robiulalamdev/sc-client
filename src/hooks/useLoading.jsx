import { useState, useEffect } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const asyncOperation = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(asyncOperation);
    };
  }, []);

  return { isLoading };
};

export default useLoading;
