import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";

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
