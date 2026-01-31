export default function filterBy(arr: unknown[], key: string, value: string) {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && key in item
    )
    .filter(item => item[key] === value);
}
