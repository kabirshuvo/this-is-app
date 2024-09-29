import { useMemo } from "react";
import { Category } from "@/types/category";
import { useFetchData } from "./useFetchData";

const useItemAudio = (randomItemName: string) => {
  const { data, loading, error } = useFetchData();

  const itemAudio = useMemo(() => {
    if (loading || error) return null;

    for (const category of Object.values(data)) {
      const item = category.find(
        (item: Category) => item.name === randomItemName
      );
      if (item) {
        return item.audio;
      }
    }
    return null;
  }, [randomItemName, data, loading, error]);

  return itemAudio;
};

export default useItemAudio;
