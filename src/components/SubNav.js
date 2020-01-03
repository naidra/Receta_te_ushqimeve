import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SubNav extends Component {
    render() {
        return (
            <div className="subNav">
                <div className="innerWrapper">
                    <NavLink exact to="/">Të gjitha</NavLink>
                    <NavLink to="/sallata">Sallata</NavLink>
                    <NavLink to="/gjellëra">Gjellëra</NavLink>
                    <NavLink to="/tradicionale">Tradicionale</NavLink>
                    <NavLink to="/brumëra">Brumëra</NavLink>
                    <NavLink to="/supa">Supa</NavLink>
                </div>
            </div>
        )
    }
}

export default SubNav;