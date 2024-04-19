import { uploadAvatar } from "@/data/image";
import { atom, useAtom } from "jotai";
import { ChangeEvent } from "react";

const imageUrlsAtom = atom([] as string[]);

export const useImage = () => {
  const [imgUrls, setImgUrls] = useAtom(imageUrlsAtom);

  const addAvatar = async (e: ChangeEvent) => {
    const formData = new FormData();
    const files = (e.target as HTMLInputElement).files as FileList;
    formData.append("uploadAvatar", files[0]);
    const response = await uploadAvatar(formData);
    return response;
  };

  return {
    addAvatar,
  };
};
