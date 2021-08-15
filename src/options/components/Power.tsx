import { useStore } from "../../store/OptionsStore";
import { Button } from "./Button";
import { Scripts } from "./Scripts";

export const Power = (): JSX.Element => {
  const { addScript } = useStore((state) => state);

  return (
    <div className="options-main">
      <div className="options-btns">
        <div className="options-btns__battery">
          <em className="icon-battery"></em>
        </div>

        <div className="options-btn src-btn--plus">
          <em className="icon-plus"></em>
        </div>

        <Button buttonClassName={"options-btn"} iconClassName="icon-code" callback={() => addScript("snippet")} />
        <Button buttonClassName={"options-btn"} iconClassName="icon-link" callback={() => addScript("external")} />
      </div>

      <Scripts />
    </div>
  );
};
