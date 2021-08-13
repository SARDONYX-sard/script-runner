import React, { useEffect } from "react";
import { Header } from "./component/Header";
import { Scripts } from "./component/Scripts";
import "./Popup.scss";

const Popup = (): JSX.Element => {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <>
      <Header></Header>
      <Scripts />
      <div className="popup-footer">Displayed only available Scripts on this host.</div>
    </>
  );
};

export default Popup;
