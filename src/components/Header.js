import React from 'react';
import Logo from '../foto/recipe.svg';
import NavUserData from './navUserData';

function Header({ userData, loginHandler, logoutHandler, toggleShtoRecet }) {
    return (
        <header>
            <div className="innerWrapper">
                <div className="logoWrapp">
                    <img alt="Receta" src={Logo} />
                    <h1>Receta të ushqimeve</h1>
                </div>
                <NavUserData
                    userData={userData}
                    loginHandler={loginHandler}
                    logoutHandler={logoutHandler}
                    toggleShtoRecet={toggleShtoRecet}
                />
            </div>
        </header>
    )
}

export default Header;