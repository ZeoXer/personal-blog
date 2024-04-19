"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const authAtom = atomWithStorage("isAuthorized", false);

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useAtom(authAtom);

  return {
    isAuthorized,
    setIsAuthorized,
  };
};
