const searchStr = (field: string, text: string) => ({
  [field]: { $regex: text, $options: "i" },
});

type StartWithDollar = `$${string}`;
const searchNonStr = (field: StartWithDollar, text: string) => ({
  $expr: {
    $regexMatch: {
      input: { $toString: field },
      regex: text,
      options: "i",
    },
  },
});

const searchDate = (field: StartWithDollar, text: string) => ({
  $expr: {
    $regexMatch: {
      input: {
        $dateToString: {
          format: "dd MMM yyyy HH:mm:ss",
          date: { $convert: { input: field, to: "date" } },
        },
      },
      regex: text,
      options: "i",
    },
  },
});

export const mongo = {
  searchStr,
  searchNonStr,
  searchDate,
};
