import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { registerLicense } from '@syncfusion/ej2-base';
import { BrowserRouter as Router } from 'react-router-dom';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x0TXxbf1x0ZFRHallZTnJaUj0eQnxTdEFjXX1XcHRUR2FZWE1yXA==');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
