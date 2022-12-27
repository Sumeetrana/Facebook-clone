import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
