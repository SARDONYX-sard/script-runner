import "./options.scss";

import { useEffect } from "react";

import { useStore } from "../store/OptionsStore";
import { Power } from "./components/Power";
import { SettingContent } from "./components/SettingContent";

const Options = (): JSX.Element => {
  const { load } = useStore((state) => state);
  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <SettingContent />
      <Power />
    </>
  );
};

export default Options;
