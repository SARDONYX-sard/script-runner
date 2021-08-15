import ReactDOM from "react-dom";
import Options from "./Options";

chrome.tabs.query({ active: true, currentWindow: true }, (_tab) => {
  ReactDOM.render(<Options />, document.getElementById("options"));
});
