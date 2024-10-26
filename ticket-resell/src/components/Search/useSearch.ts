import { useState, useEffect } from "react";

// Hàm loại bỏ dấu trong tiếng Việt
export const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

interface UseSearchProps<T> {
  query: string;
  results: T[];
  visibleCount: number;
  filterFunction: (item: T, query: string) => boolean;
}

const useSearch = <T>({ query, results, visibleCount, filterFunction }: UseSearchProps<T>) => {
  const [filteredResults, setFilteredResults] = useState<T[]>([]);
  const [visibleResults, setVisibleResults] = useState<T[]>([]);

  useEffect(() => {
    const normalizedQuery = removeVietnameseTones(query.toLowerCase()); // Normalize query

    const filtered = results.filter((item) => 
      filterFunction(item, normalizedQuery) // Normalize item bên trong filterFunction
    );
    setFilteredResults(filtered);
    setVisibleResults(filtered.slice(0, visibleCount));
  }, [query, results, visibleCount, filterFunction]);

  const showMoreResults = () => {
    setVisibleResults(filteredResults.slice(0, visibleResults.length + 10));
  };

  return {
    filteredResults,
    visibleResults,
    showMoreResults,
  };
};

export default useSearch;