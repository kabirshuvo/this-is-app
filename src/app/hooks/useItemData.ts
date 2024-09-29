import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { fetchRelatedData } from "./useCategoryData";

interface Params {
  itemId: number | null;
  category: string;
}

const useItemData = ({ itemId, category }: Params) => {
  const [itemData, setItemData] = useState<Category | null>(null);

  useEffect(() => {
    if (itemId !== null) {
      const fetchItemData = async () => {
        try {
          const data = await fetchRelatedData(category);
          const item = data.find((item) => item.id === itemId);
          setItemData(item || null);
        } catch (error) {
          console.error("Error fetching item data:", error);
        }
      };

      fetchItemData();
    }
  }, [itemId, category]);

  return itemData;
};

export default useItemData;
