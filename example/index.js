import 'react-app-polyfill/ie11';
import * as React from 'react';
import App from './App';
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";

const container = document.getElementById('root');
if(container) {
  const root = createRoot(container);
  root.render(<Router><App /></Router>);
}