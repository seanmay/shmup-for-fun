import { render } from "react-dom";
import * as React from "react";

import { Editor } from "./editor.js";

const root = document.querySelector("#app-root");
console.log(root);
render(<Editor />, root);