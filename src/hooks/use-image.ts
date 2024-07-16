import {
  fetchAvatar,
  fetchPublicAvatar,
  removeAvatar,
  uploadAvatar,
  uploadImage,
} from "@/data/image";
import { atom, useAtom } from "jotai";
import { ChangeEvent, useCallback } from "react";

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

  const getPublicAvatar = useCallback(async (authorName: string) => {
    const response = await fetchPublicAvatar(authorName);
    if (!response.status) return "";

    return response.data.path;
  }, []);

  const deleteAvatar = async () => {
    const response = await removeAvatar();
    if (response.status) {
      setAvatar("");
    }

    return response;
  };

  const addImage = async (file: File) => {
    const formData = new FormData();
    formData.append("uploadImage", file);
    const response = await uploadImage(formData);

    return response;
  };

  return {
    avatar,
    setAvatar,
    addAvatar,
    getAvatar,
    getPublicAvatar,
    deleteAvatar,
    addImage,
  };
};
