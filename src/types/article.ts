export type ArticleCategory = {
  id: number;
  username: string;
  category_name: string;
};

export type Article = {
  id: number;
  username: string;
  title: string;
  content: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  is_published: boolean;
};

export type PanelArticle = {};
