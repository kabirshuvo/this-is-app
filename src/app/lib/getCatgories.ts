export async function fetchCategories() {
  const response = await fetch("/categories.json");
  const categoriesData = await response.json();
  return categoriesData;
}
