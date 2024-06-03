import { mutate } from "swr";

export default function revalidate(partialKey: string) {
  return mutate((key: string[] | string | undefined) => {
    switch (typeof key) {
      case "object":
        return key[0].startsWith(partialKey);
      case "string":
        return key.startsWith(partialKey);
      default:
        return false;
    }
  });
}
