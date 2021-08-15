import { useBoolean } from "react-use";

import { useStore } from "../../store/OptionsStore";

export const SettingContent = (): JSX.Element => {
  const [show, setShow] = useBoolean(false);

  const { data, changeOptionsElement, save, toggleSwitch } = useStore((state) => state);
  const { power, options } = data;

  return (
    <>
      <div className="options-setting">
        <em className="icon-cog" onClick={setShow}></em>
      </div>

      {show && (
        <div className={`options-setting__content ${show ? "show" : ""}`}>
          <div className="options-setting__container">
            <div className="options-setting__body">
              <div className="options-setting__header">
                <em className="icon-cog"></em>
                <span>Options</span>
                <span onClick={setShow}>
                  <em className="icon-cancel-circled"></em>
                </span>
              </div>

              <div className="options-setting__main">
                <div className="options-flex">
                  <span>
                    <em className="icon-cloud-flash"></em>
                  </span>
                  <span> Exclude hostname</span>
                </div>
                <textarea
                  onKeyUp={save}
                  v-model="options .exclude"
                  onChange={(e) => changeOptionsElement(e.target.value)}
                  value={options.exclude}
                  placeholder="Exclude host names, split by comma"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`options-power ${!power ? "options-power--off" : ""}`} onClick={toggleSwitch}>
        <em className="icon-flash"></em>
      </div>
    </>
  );
};
