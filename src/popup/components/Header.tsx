import { useStore } from "../../store/PopupStore";
import { openHTML } from "../utils/tab";

export const Header = (): JSX.Element => {
  const togglePower = useStore((state) => state.togglePower);

  return (
    <div className="popup-header">
      <span onClick={togglePower}>
        <em className="icon-flash"></em>
      </span>
      <span>Script Runner</span>
      <span onClick={() => openHTML("options.html")}>
        <em className="icon-cog"></em>
      </span>
    </div>
  );
};
