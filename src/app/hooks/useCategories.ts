import { useState, useEffect } from "react";
import { fetchCategories } from "../lib/getCatgories";
import { Category } from "@/types/category";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    }

    loadCategories();
  }, []);

  return categories;
};

export default useCategories;
