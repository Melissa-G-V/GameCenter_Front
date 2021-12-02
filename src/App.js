import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ClienteContext } from "./ClienteContext.js";

import Header from "./Header.js";
import Listagem from "./Listagem.js";
import UserLogin from "./UserLogin.js";
import Form from "./Form.js";
import FormTwo from "./FormTwo.js";
import Reviews from "./Reviews.js";
import "./App.css";
import Grafico2 from "./Grafico2.js";





function App() {

  const [dados, setDados] = useState({})

  return (
    <ClienteContext.Provider value={{dados, setDados}}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Form/>
            <Listagem / >

          </Route>
          <Route path="/login">
            <UserLogin />
          </Route>
          <Route path="/graph1">
           <Grafico2/>
          </Route>
          <Route path="/review">
           <Reviews/>
          </Route>
        </Switch>
      </Router>
    </ClienteContext.Provider>
  );
}

export default App;
