import { useStore } from "../../store/OptionsStore";
import { Button } from "./Button";

import type { ScriptObj } from "../../types/popup";

export const Scripts = (): JSX.Element => {
  const { scripts } = useStore((state) => state.data);

  return (
    <ul className="options-scripts">
      {scripts.map((script, index) => (
        <Script key={index} script={script} index={index} />
      ))}
    </ul>
  );
};

type ScriptProps = {
  script: ScriptObj;
  index: number;
};

const Script = ({ script, index }: ScriptProps) => {
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

  const { changeScriptElement, togglePower, moveUp, moveDown, removeScript, save } = useStore((state) => state);
  const { name, code, src, host } = script;

  return (
    <li className={`options-script ${script.enable ? "options-script--enable" : ""}`}>
      <div className="options-script__plug" onClick={() => togglePower(index)}></div>

      <div className="options-script__box">
        <div className="options-script__content">
          <div className="options-flex options-flex--head">
            <input
              className="options-script__name"
              type="text"
              onChange={(e) => changeScriptElement(index, "name", e.target.value)}
              value={name}
            />
            <div className="options-script__btns">
              <Button
                buttonClassName={"options-script__btn"}
                iconClassName="icon-down-circled"
                callback={() => moveDown(index)}
              />
              <Button buttonClassName={"options-script__btn"} iconClassName="icon-up-circled" callback={() => moveUp(index)} />
            </div>
          </div>

          <div className="options-flex options-flex--content">
            <div className="options-script__type">
              <em className={`${typeToClassName()}`}></em>
            </div>

            {script.type === "snippet" && (
              <div className="options-script__snippet">
                <textarea
                  onKeyUp={save}
                  onChange={(e) => changeScriptElement(index, "code", e.target.value)}
                  value={code}
                  placeholder="Write your own code here."
                ></textarea>
              </div>
            )}

            {script.type === "external" && (
              <div className="options-script__external">
                <input
                  onBlur={save}
                  type="text"
                  onChange={(e) => changeScriptElement(index, "src", e.target.value)}
                  value={src}
                  placeholder="Set JS file's URL. (e.g. //code.jquery.com/jquery-2.1.4.min.js)"
                />
              </div>
            )}
          </div>

          <div className="options-flex options-flex--foot">
            <em className="icon-cloud-flash"></em>

            <input
              className="options-script__host"
              onChange={(e) => changeScriptElement(index, "host", e.target.value)}
              value={host}
              onBlur={save}
              placeholder="Target hostname. By default, target to all host."
            />

            <Button
              buttonClassName={"options-script__btn remove"}
              iconClassName="icon-trash"
              callback={() => removeScript(index)}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
