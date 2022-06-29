import React from "react";

import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import VisualProofReader from "./Pages/Proof/visualProofReader";
import Home from "./Pages/Home/Home";
import Gallery from "./Pages/Gallery/Gallery";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";

function App() {
  return (
    <div className="App">
      <Router>

        <Route exact path={"/"}>
          <Home />
        </Route>

        <Route exact path={"/proofReader"}>
          <VisualProofReader />
        </Route>

        <Route exact path={"/Gallery"}>
          <Gallery />
        </Route>

<<<<<<< HEAD
        <Route exact path={"/productpage/:sku"}>
=======
        <Route exact path={"/:sku"}>
>>>>>>> 0ae79e60e42acf1be646dcb6893fdea7b8865148
          <SingleProduct />
        </Route>
        
      </Router>
    </div>
  );
}

export default App;
