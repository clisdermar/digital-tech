import React, { Component} from "react";
import './Header.css';


class Header extends Component {
    render(){
        return(
            <div className="header">
                 <h1>DTech Inc</h1>
                 <div className="search-container">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Buscar..." />
                </div>
                 {/* <i className="fas fa-home"></i> */}
            </div>

     );
    }
}

export default Header;