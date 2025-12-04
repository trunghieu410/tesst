import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Country {
  id: string;
  name: string;
  niceName: string;
  iso: string;
  iso3: string;
  numCode: number;
  phoneCode: number;
  flag: string;
}

export interface CountriesResponse {
  total: number;
  data: Country[];
  code: string;
  message: string | null;
}

const COUNTRIES_API_URL = "https://open.oapi.vn/location/countries";

export function useCountries() {
  return useQuery<CountriesResponse>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axios.get<CountriesResponse>(COUNTRIES_API_URL);
      return response.data;
    },
    // staleTime: 15 * 60 * 1000, // 15 minutes - countries data rarely changes
    // gcTime: 30 * 60 * 1000, // 30 minutes cache time
  });
}
