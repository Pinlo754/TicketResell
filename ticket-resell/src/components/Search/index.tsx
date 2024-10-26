import React, { useState } from "react";
import useSearch from "./useSearch";

interface SearchProps<T> {
  placeholder: string;
  results: T[];
  onSelect: (item: T) => void;
  renderResult: (item: T) => React.ReactNode; // Cách hiển thị kết quả
  filterFunction: (item: T, query: string) => boolean; // Hàm lọc kết quả
  handleEnterKey?: () => void;
}

const Search = <T,>({
  placeholder,
  results,
  onSelect,
  renderResult,
  filterFunction,
  handleEnterKey,
}: SearchProps<T>) => {
  const [query, setQuery] = useState<string>("");
  const { filteredResults, visibleResults, showMoreResults } = useSearch({
    query,
    results,
    visibleCount: 10,
    filterFunction,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && handleEnterKey) {
      handleEnterKey();
    }
  };

  return (
    <div>
      <div className="bg-gray-200 backdrop-blur rounded-lg flex items-center hover:bg-gray-100 focus:bg-gray-100">
        <div className="pointer-events-auto px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 3a7.5 7.5 0 015.775 12.425l5.35 5.35a.75.75 0 11-1.06 1.06l-5.35-5.35A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="border p-2 w-full outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {query !== "" &&
        visibleResults.length > 0 && ( // Kiểm tra nếu query không rỗng
          <div className="mt-2">
            {visibleResults.map((item, index) => (
              <div
                key={index}
                className="border p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => onSelect(item)}
              >
                {renderResult(item)}
              </div>
            ))}
            {visibleResults.length < filteredResults.length && (
              <button
                onClick={showMoreResults}
                className="bg-gray-300 text-gray-700 py-1 px-3 mt-2 rounded-lg hover:bg-gray-400"
              >
                Hiển thị thêm ({filteredResults.length - visibleResults.length})
              </button>
            )}
          </div>
        )}

      {query !== "" && visibleResults.length === 0 && (
        <p className="text-gray-600 mt-2">Không tìm thấy kết quả nào.</p>
      )}
    </div>
  );
};

export default Search;