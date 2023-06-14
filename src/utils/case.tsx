export const upperCase = (text: string) =>
  typeof text !== "string"
    ? text
    : text
        .split(/(?=[A-Z_])/)
        .map((word) => word.toUpperCase())
        .join(" ");

export const capitalCase = (text?: string) => {
  if (typeof text !== "string") return text ?? "";
  const words = text.split(/(?=[A-Z_])/);
  return words
    .map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return `${firstLetter}${restOfWord}`;
    })
    .join(" ");
};
