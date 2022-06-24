import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import visualProofReader from './Pages/visualProofReader'

function App() {
  
  return (
    <div className="App">
      <Router>
        <Route exact path={"/"}>
          <visualProofReader/>
        </Route>
      </Router>
      </div>
  );
}

export default App;
