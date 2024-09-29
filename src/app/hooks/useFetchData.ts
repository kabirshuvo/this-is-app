import { useState, useEffect } from "react";
import axios from "axios";
import type { Category } from "@/types/category";

export const useFetchData = () => {
  const [data, setData] = useState<{ [key: string]: Category[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/items.json");
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
