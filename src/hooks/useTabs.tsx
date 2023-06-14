import { useState } from "react";

// ----------------------------------------------------------------------

export default function useTabs<T extends string>(defaultValues?: T) {
  const [currentTab, setCurrentTab] = useState<T>(defaultValues || ("" as T));

  return {
    currentTab,
    onChangeTab: (event: unknown, newValue: T) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
