import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Mines } from '../.';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "row"}}>
        <div className="container main-container">
          <Routes>
            <Route index element={<Mines/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if(container) {
  const root = createRoot(container);
  root.render(<Router><App /></Router>);
}
