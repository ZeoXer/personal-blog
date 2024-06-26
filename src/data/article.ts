import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";
import { Article, ArticleCategory } from "@/types/article";

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

export async function updateArticleCategory(
  categoryId: number,
  categoryName: string
) {
  const response = await HttpClient.put<APIResponse<unknown>>(
    `${API_ENDPOINTS.UPDATE_CATEGORY}/${categoryId}`,
    {
      category_name: categoryName,
    }
  );

  return response;
}

export async function addArticle(
  title: string,
  content: string,
  categoryId: number
) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.ADD_ARTICLE,
    {
      title,
      content,
      category_id: categoryId,
    }
  );

  return response;
}

export async function getArticle(articleId: number) {
  const response = await HttpClient.get<APIResponse<Article>>(
    `${API_ENDPOINTS.GET_ARTICLE}/${articleId}`
  );

  return response;
}

export async function updateArticle(
  articleId: number,
  title: string,
  content: string,
  categoryId: number
) {
  const response = await HttpClient.put<APIResponse<unknown>>(
    `${API_ENDPOINTS.UPDATE_ARTICLE}/${articleId}`,
    {
      title,
      content,
      category_id: categoryId,
    }
  );

  return response;
}

export async function getArticlesByCategory(categoryId: number) {
  const response = await HttpClient.get<APIResponse<Article[]>>(
    `${API_ENDPOINTS.GET_ARTICLES_BY_CATEGORY}/${categoryId}`
  );

  return response;
}
