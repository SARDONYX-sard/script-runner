import "./Popup.scss";



import { Header } from "./components/Header";
import { Scripts } from "./components/Scripts";

const Popup = (): JSX.Element => (
    <>
      <Header></Header>
      <Scripts />
      <div className="popup-footer">Displayed only available Scripts on this host.</div>
    </>
  );

export default Popup;
