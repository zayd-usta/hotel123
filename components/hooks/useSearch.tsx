import { SearchType } from "@/types";
import { create } from "zustand";
interface SearchState {
  searchData: SearchType | undefined;
  setSearchData: (search: SearchType | undefined) => void;
}

export const useSearch = create<SearchState>((set) => ({
  searchData: undefined,
  setSearchData: (search) => set(() => ({ searchData: search })),
}));
