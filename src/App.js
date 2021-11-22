import React, {useState} from "react";
import Header from "./Header.js";
import Listagem from "./Listagem.js";
import UserLogin from "./UserLogin.js";
import { ClienteContext } from "./ClienteContext.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        </Switch>
      </Router>
    </ClienteContext.Provider>
  );
}

export default App;
