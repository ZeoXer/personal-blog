import { fetchAvatar, removeAvatar, uploadAvatar } from "@/data/image";
import { atom, useAtom } from "jotai";
import { ChangeEvent } from "react";

const avatarAtom = atom("");

export const useImage = () => {
  const [avatar, setAvatar] = useAtom(avatarAtom);

  const addAvatar = async (e: ChangeEvent) => {
    const formData = new FormData();
    const files = (e.target as HTMLInputElement).files as FileList;
    formData.append("uploadAvatar", files[0]);
    const response = await uploadAvatar(formData);

    return response;
  };

  const getAvatar = async () => {
    const response = await fetchAvatar();
    if (response.status) {
      setAvatar(response.data.path);
    } else {
      setAvatar("");
    }

    return response;
  };

  const deleteAvatar = async () => {
    const response = await removeAvatar();
    if (response.status) {
      setAvatar("");
    }

    return response;
  };

  return {
    avatar,
    setAvatar,
    addAvatar,
    getAvatar,
    deleteAvatar,
  };
};
