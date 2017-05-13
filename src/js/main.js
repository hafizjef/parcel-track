import "../css/theme.sass"
import React from "react"
import ReactDOM from "react-dom"

import DataStore from "./store/DataStore"
import DataList from "./components/DataList"

const app = document.getElementById("app")

ReactDOM.render(<DataList store={DataStore} />, app)