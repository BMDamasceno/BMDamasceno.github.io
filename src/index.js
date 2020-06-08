import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import XoPreg from "./XoPreg"

var destination = document.querySelector("#container")

ReactDOM.render(
    <div>
        <p>
            <XoPreg/>
        </p>
    </div>,
    destination
);