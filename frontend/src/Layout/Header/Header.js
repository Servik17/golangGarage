import React, {Component} from "react";
import {Link} from "react-router-dom";

class Header extends Component {

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render() {
        return (
            <header className="app-header navbar">
                <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={Header.mobileSidebarToggle}
                        type="button">&#9776;</button>
                <Link to={'/dashboard'} className="navbar-brand"/>
                <ul className="nav navbar-nav d-md-down-none mr-auto">
                    <li className="nav-item">
                        <a className="nav-link navbar-toggler sidebar-toggler"
                           onClick={Header.sidebarToggle}>&#9776;</a>
                    </li>
                </ul>
            </header>
        )
    }
}

export default Header;
