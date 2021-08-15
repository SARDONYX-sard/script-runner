import { useStore } from "../../store/PopupStore";
import { count, isExcludeHost, isMatch } from "../utils/tab";

import type { ScriptObj } from "../../types/popup";

export const Scripts = (): JSX.Element => {
  const data = useStore((state) => state.data);

  if (count(data) && !isExcludeHost(data)) {
    return <li className="popup-noscript">No available Scripts on this host.</li>;
  }

  return (
    <ul className="popup-scripts">
      {isExcludeHost(data) && <li className="popup-noscript">This host is excluded.</li>}

      {data.scripts.forEach((script: ScriptObj, index: number) => {
        <Script script={script} index={index} />;
      })}
    </ul>
  );
};

type ScriptProps = {
  script: ScriptObj;
  index: number;
};

const Script = ({ script, index }: ScriptProps) => {
  const { data, toggle } = useStore((state) => state);

  function typeToClassName() {
    switch (script.type) {
      case "external":
        return "icon-link";
      case "snippet":
        return "icon-code";

      default:
        break;
    }
  }

  return (
    <>
      {isMatch(data, script.host) && (
        <li className={`popup-script ${script.enable ? "popup-script--enable" : ""}`}>
          <div className="popup-script__main">
            <span>
              <em className={typeToClassName()}></em>
            </span>
            <span>{script.name}</span>
            <span>
              <em onClick={() => toggle(index)} className="icon-plug"></em>
            </span>
          </div>
        </li>
      )}
    </>
  );
};
