import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link" activeClassName="active">
                                <i className="icon-speedometer" /> Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/cars'} className="nav-link" activeClassName="active">
                                <i className="icon-home" /> Гараж
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/repairs'} className="nav-link" activeClassName="active">
                                <i className="icon-wrench" /> Ремонты
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Sidebar;
