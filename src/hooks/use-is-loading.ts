"use client";

import { atom, useAtom } from "jotai";

const isLoadingAtom = atom(false);

export const useIsLoading = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  return {
    isLoading,
    setIsLoading,
  };
};
