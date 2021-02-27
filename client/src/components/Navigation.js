import React, {useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Burger from './Menu/Burger';

const Navigation = () => {
    const [isOpen, setOpen] = useState(false);
    const location = useLocation();
    
    return (
        <header className={location.pathname === "/mapa" ? "header--map" : "header"}>
            <div className="navigation__container">
                <Burger isOpen={isOpen} setOpen={setOpen}/>
                <nav className={isOpen ? "navigation navigation--open" : "navigation"}>
                    <ul className="navigation__link-list">
                        <li className="navigation__link-item"><NavLink exact to="/#" className="navigation__link" activeClassName="navigation__link--active">START</NavLink></li>
                        <li className="navigation__link-item"><NavLink to="/mapa" className="navigation__link" activeClassName="navigation__link--active">MAPA</NavLink></li>
                        <li className="navigation__link-item"><NavLink to="/o-nas" className="navigation__link" activeClassName="navigation__link--active">O NAS</NavLink></li>
                        <li className="navigation__link-item"><NavLink to="/kontakt" className="navigation__link" activeClassName="navigation__link--active">KONTAKT</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navigation;