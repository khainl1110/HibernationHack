import { StrictMode } from "react";
import ReactDOM from "react-dom";

import ContextWrapper from "./ContextWrapper";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ContextWrapper />
  </StrictMode>,
  rootElement
);
