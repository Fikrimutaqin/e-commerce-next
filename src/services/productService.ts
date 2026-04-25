import axiosInstance from "@/lib/axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const productService = {
  getAllProducts: async (limit?: number): Promise<Product[]> => {
    const url = limit ? `/products?limit=${limit}` : "/products";
    const response = await axiosInstance.get<Product[]>(url);
    return response.data;
  },

  getProductById: async (id: number | string): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string, limit?: number): Promise<Product[]> => {
    const url = limit ? `/products/category/${category}?limit=${limit}` : `/products/category/${category}`;
    const response = await axiosInstance.get<Product[]>(url);
    return response.data;
  },

  addToCartApi: async (userId: number, products: { productId: number; quantity: number }[]): Promise<any> => {
    const response = await axiosInstance.post("/carts", {
      userId,
      products,
    });
    return response.data;
  },
};
