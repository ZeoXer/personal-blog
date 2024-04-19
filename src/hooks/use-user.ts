"use client";

import { useAtom } from "jotai";
import { getMe } from "../data/auth";
import { atomWithStorage } from "jotai/utils";

const usernameAtom = atomWithStorage<string>("username", "");
const emailAtom = atomWithStorage<string>("email", "");

export const useUser = () => {
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const fetchUser = async () => {
    const response = await getMe();
    if (response.status) {
      setUsername(response.data.username);
      setEmail(response.data.email);
    }
  };

  return {
    username,
    email,
    fetchUser,
  };
};
