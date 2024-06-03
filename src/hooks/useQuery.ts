import useSWR, { SWRConfiguration } from "swr";
import { useCookies } from "react-cookie";
import { getFetcher } from "@/lib/fetcher";
import { AccessTokenKey, LibraryBaseURL } from "@/constants/strings";

type TKey = string | [string, Record<string, string>] | null;

function formatKey(key: TKey, access_token: string) {
  if (key) {
    if (Array.isArray(key)) {
      return [...key, access_token];
    }
    return [key, access_token];
  }
  return null;
}

function useQuery<Data>(
  key: TKey,
  fetcher: (
    _key: string,
    _options?: { arg: Record<string, string> }
  ) => Promise<Data>,
  config?: SWRConfiguration<Data, Error>
) {
  const { access_token } = useCookies([AccessTokenKey])[0];

  return useSWR<Data, Error>(formatKey(key, access_token), fetcher, {
    keepPreviousData: true,
    ...config,
  });
}

export function useLibraryQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(key, getFetcher(LibraryBaseURL), config);
}
