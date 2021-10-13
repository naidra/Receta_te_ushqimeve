import React from 'react';
import LazyLoad from 'react-lazyload';
import Receta from './Receta';
import Ripple from '../foto/Ripple.svg';

function ContentWrapper(props) {
    const { userData, recetat, filtroRecetat, fshijeReceten, ndryshoReceten, voteHandler } = props;
    if(!recetat || !filtroRecetat().length) return (
        <div className="contentPart">
            <div className="innerWrapper">
                <div className="imageLoader">
                    <img src={Ripple} alt="Ripple loader" />
                </div>
            </div>
        </div>
    )
    return (
        <div className="contentPart">
            <div className="innerWrapper">
                <h2 className="recetatH2">Recetat</h2>
                <ul className="recetaContainer">
                    {
                    filtroRecetat().map((receta, id) =>
                        <LazyLoad key={(Math.random() * 1000)} height={150} offset={100} once>
                            <Receta key={(Math.random() * 1000) + id}
                            receta={receta}
                            loggedAs={userData.uName || userData.uEmail}
                            deleteHandler={fshijeReceten}
                            updateHandler={ndryshoReceten}
                            voteHandler={voteHandler}
                            />
                        </LazyLoad>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default ContentWrapper;