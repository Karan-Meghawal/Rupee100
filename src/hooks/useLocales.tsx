import { enUS } from "@mui/material/locale";

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
  },
];

export default function useLocales() {
  const currentLang = LANGS[0];

  return {
    currentLang,
    allLang: LANGS,
  };
}
