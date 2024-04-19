export type APIResponse<T> = {
  data: T;
  message: string;
  status: 0 | 1;
};

export type LoginResponse = {
  username: string;
  email: string;
  token: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
};

// 定義需檢驗登入狀態的元件屬性
export type AuthPageProps = {
  isAuthorized: boolean;
};