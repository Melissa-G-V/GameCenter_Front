import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ClienteContext } from "./ClienteContext.js";

import Header from "./Header.js";
import Listagem from "./Listagem.js";
import UserLogin from "./UserLogin.js";
import Grafico2 from "./Grafico2.js";

function App() {

  const [dados, setDados] = useState({})

  return (
    <ClienteContext.Provider value={{dados, setDados}}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Listagem />
          </Route>
          <Route path="/login">
            <UserLogin />
          </Route>
          <Route path="/graph1">
            <Grafico2 />
          </Route>
        </Switch>
      </Router>
    </ClienteContext.Provider>
  );
}

export default App;
