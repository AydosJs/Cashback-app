import { get } from "./ApiClients";

export interface Company {
  id: number;
  status: string;
  name: string;
  slogan: string;
  bookmarked: boolean;
  rating: number;
  description: string;
  logo: any;
}
export interface Category {
  name?: string;
}

export interface Product {
  id: number;
  name: string;
  company: number;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
}

interface RequestsResponse {
  current_page_number: number;
  num_items_per_page: number;
  items?: Company[] | Product[];
  total_count: number;
}

export function getCompanies(data?: FormData) {
  return get<RequestsResponse>("https://api.uracashback.uz/companies", data);
}

export function getCompaniesProducts(id?: string | number) {
  return get<RequestsResponse>(
    `https://api.uracashback.uz/companies/${id}/products`
  );
}
