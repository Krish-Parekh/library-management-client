import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { deleteFetcher, postJsonFetcher, putFetcher } from "@/lib/fetcher";
import { LibraryBaseURL } from "@/constants/strings";

export default function useMutation<ExtraArgs, Data>(
  key: string,
  fetcher: (_key: string, _options?: { arg: ExtraArgs }) => Promise<Data>,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useSWRMutation<Data, Error, string, ExtraArgs>(key, fetcher, {
    throwOnError: false,
    ...config,
  });
}

export function useLibraryPostMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(LibraryBaseURL),
    config
  );
}

export function useLibraryDeleteMutation<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    deleteFetcher(LibraryBaseURL),
    config
  );
}

export function useLibraryPutMutation<Data>(
    key: string,
    config?: SWRMutationConfiguration<Data, Error, string>
  ) {
    return useMutation<unknown, Data>(
      key,
      putFetcher(LibraryBaseURL),
      config
    );
  }
