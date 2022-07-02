import React from "react";

import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VisualProofReader from "./Pages/Proof/visualProofReader";
import Home from "./Pages/Home/Home";
import Gallery from "./Pages/Gallery/Gallery";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import ReportGen from "./Pages/ReportGen/ReportGen";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"}>
        <Home />
      </Route>

      <Route exact path={"/proofReader"}>
        <VisualProofReader />
      </Route>

      <Route exact path={"/Gallery"}>
        <Gallery />
      </Route>

      <Route exact path={"/rename"}>
        <Gallery />
      </Route>

      <Route exact path={"/rename/:sku"}>
        <SingleProduct />
      </Route>

      <Route exact path={"/productPage/:sku"}>
        <SingleProduct />
      </Route>

      <Route exact path={"/ReportGen"}>
        <ReportGen />
      </Route>
    </div>
  );
}

export default App;
