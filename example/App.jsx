import {Route, Routes} from "react-router-dom";
import {Mines} from "../dist";
import * as React from "react";

const App = () => {
  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "row"}}>
        <div className="container main-container">
          <Routes>
            <Route path={"/mines"} element={<Mines/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
