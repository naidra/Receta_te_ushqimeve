import React from 'react';
import facebookPhotoSrc from '../foto/facebook.svg';
import githubPhotoSrc from '../foto/github.svg';

function NavUserData(props) {
    const { userData, loginHandler, logoutHandler, toggleShtoRecet } = props;
    if(userData.uId) {
        return (
            <div className="userWrapper">
                <button className="shtoRecet-btn" onClick={toggleShtoRecet}>Shto një recetë</button>
                <div className="dropDownWrapper">
                    <input type="checkbox" id="forDrop" />
                    <label htmlFor="forDrop">{userData.uName || userData.uEmail}</label>
                    <ul className="dropDown">
                        <li>{ userData.uEmail }</li>
                        <li><small>Kyqur me:&nbsp;</small>{ userData.provider }</li>
                        <li className="lastLi">
                            <button onClick={logoutHandler}>Çkyqu</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="userWrapper notLogged">
            <div className="dropDownWrapper">
                <input type="checkbox" id="forDrop" />
                <label htmlFor="forDrop">Kyqu</label>
                <ul className="dropDown">
                    <li onClick={() => loginHandler('facebook')}>
                        <img src={facebookPhotoSrc} alt="Facebook" />
                        Me Facebook
                    </li>
                    <li onClick={() => loginHandler('github')}>
                        <img src={githubPhotoSrc} alt="Github" />
                        Me GitHub
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavUserData;