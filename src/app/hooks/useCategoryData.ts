import axios from "axios";
import type { Category } from "@/types/category";

export async function fetchRelatedData(category: string): Promise<Category[]> {
  const formattedCategory = decodeURIComponent(category).replace(/ /g, "-");

  try {
    const response = await axios.get("/items.json");
    const data = response.data;
    return data[formattedCategory] || [];
  } catch (error) {
    throw new Error(`Failed to fetch data for category: ${category}`);
  }
}
