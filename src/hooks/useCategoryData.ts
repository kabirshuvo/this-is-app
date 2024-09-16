import type { Category } from "@/types/category";

export async function fetchRelatedData(category: string): Promise<Category[]> {
  const formattedCategory = decodeURIComponent(category).replace(/ /g, "-");

  const response = await fetch("/items.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch data for category: ${category}`);
  }
  const data = await response.json();
  return data[formattedCategory] || [];
}
