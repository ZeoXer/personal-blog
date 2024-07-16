import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";
import { Avatar, Image } from "@/types/image";

export async function uploadAvatar(file: FormData) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.UPLOAD_AVATAR,
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}

export async function fetchAvatar() {
  const response = await HttpClient.get<APIResponse<Avatar>>(
    API_ENDPOINTS.GET_AVATAR
  );

  return response;
}

export async function fetchPublicAvatar(authorName: string) {
  const response = await HttpClient.get<APIResponse<Avatar>>(
    `${API_ENDPOINTS.GET_PUBLIC_AVATAR}/${authorName}`
  );

  return response;
}

export async function removeAvatar() {
  const response = await HttpClient.delete<APIResponse<unknown>>(
    API_ENDPOINTS.REMOVE_AVATAR
  );

  return response;
}

export async function uploadImage(file: FormData) {
  const response = await HttpClient.post<APIResponse<Image>>(
    API_ENDPOINTS.UPLOAD_IMAGE,
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}
