import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";
import { ArticleCategory } from "@/types/article";

export async function addArticleCategory(categoryName: string) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.ADD_CATEGORY,
    {
      category_name: categoryName,
    }
  );

  return response;
}

export async function getAllArticleCategory() {
  const response = await HttpClient.get<APIResponse<ArticleCategory[]>>(
    API_ENDPOINTS.GET_ALL_CATEGORY
  );

  return response;
}
