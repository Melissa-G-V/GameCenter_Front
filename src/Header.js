import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ClienteContext } from "./ClienteContext";
import { useHistory } from "react-router-dom";

import "./Header.css";

const Header = () => {

  const cliente = useContext(ClienteContext);
  let history = useHistory();

  const loginLogout = () => {
    cliente.setDados({id: null, nome: "", token: ""});
    history.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-4">
      <Link className="navbar-brand" to="/">
        <img
          src="GameCenter.png"
          alt="Revenda Herbie"
          width="80"
          className="float-left mr-2"
        />
        <h3>GameCenter</h3>
        
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/graph1">
            Gráfico
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/jogos">
            Enviar Jogos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/review">
            Reviews
          </Link>
        </li>
        <li className="nav-item">
          <span className="nav-link" onClick={loginLogout}>
            <i className="fas fa-user-friends mr-2"></i>
            { cliente.dados.nome ? cliente.dados.nome + " (sair)" : "(Logar)"}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
