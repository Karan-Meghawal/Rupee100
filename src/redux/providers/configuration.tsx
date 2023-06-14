import { api } from "@/utils/api";
import { appData } from "@/utils/formatNumber";
import numeral from "numeral";
import { useAppDispatch } from "../hook";
import { updateConfiguration } from "../slices/configuration";

const ConfigurationProvider = () => {
  const dispatch = useAppDispatch();
  api.configuration.useQuery(undefined, {
    onSuccess(data) {
      dispatch(updateConfiguration(data));
      appData.currencyPosition = data.currencyPosition;

      if (!numeral.locales.fr) {
        numeral.register("locale", "fr", {
          delimiters: {
            thousands: ",",
            decimal: ".",
          },
          abbreviations: {
            thousand: "k",
            million: "m",
            billion: "b",
            trillion: "t",
          },
          ordinal(number) {
            return number === 1 ? "er" : "ème";
          },
          currency: {
            symbol: data.currency,
          },
        });
        numeral.locale("fr");
      }
    },
  });
  return null;
};

export default ConfigurationProvider;
