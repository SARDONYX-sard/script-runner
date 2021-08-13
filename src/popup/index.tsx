import React from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup";

chrome.tabs.query({ active: true, currentWindow: true }, (_tab) => {
  ReactDOM.render(<Popup />, document.getElementById("popup"));
});
