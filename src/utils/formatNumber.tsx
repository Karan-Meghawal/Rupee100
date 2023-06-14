import numeral from "numeral";

export const appData = {
  currencyPosition: "prefix",
};

const format = (number: number) => {
  if (appData.currencyPosition === "prefix")
    return Number.isInteger(number) ? "$0,0" : "$0,0.00";
  return Number.isInteger(number) ? "0,0$" : "0,0.00$";
};

export const fCurrency = (number: number) =>
  numeral(number).format(format(number));

export const fPercent = (number: number) =>
  numeral(number / 100).format("0.00%");

export function fShortPercent(number: number) {
  return numeral(number / 100).format("0%");
}

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fShortenNumber(number: number) {
  return numeral(number).format("0.00a").replace(".00", "");
}

export function fData(number: number) {
  return numeral(number).format("0.0 b");
}

export const fShortCurrency = (number: number) =>
  numeral(number).format(
    appData.currencyPosition === "prefix" ? "($0.00a)" : "(0.00a$)",
  );
