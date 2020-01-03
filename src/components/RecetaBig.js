import React from 'react';
import { withRouter } from 'react-router-dom';
import Ripple from '../foto/Ripple.svg';

function RecetaBig(props) {
    if(!props.recetat) return (
        <div className="contentPart">
            <div className="innerWrapper">
                <div className="imageLoader">
                    <img src={Ripple} alt="Ripple loader" />
                </div>
            </div>
        </div>
    );
    const {autori, emri, fotoUrl, kategoria, perberja, pergatitja, votat, unChangableName, dataEPostimit } = props.recetat[props.match.params.catId];
    return (
        <div className="bigRecetWrapper">
            <div className="innerWrapper">
                <div className="section firstSection">
                    <img src={fotoUrl} alt={emri} />
                    <h2>{emri}</h2>
                </div>
                <div className="section secondSection">
                    <p><b>Perberja:</b> <br/>{perberja}</p>
                    <p><b>Pergatitja:</b> <br/>{pergatitja}</p>
                </div>
                <div className="section thirdSection">
                    <div className="catContainer">
                        <p>Kategoria: {kategoria}</p>
                        <p>Postuar nga: {autori}</p>
                        <p>Postuar më: {dataEPostimit}</p>
                    </div>
                    <div className="upDownVote">
                        <button className="up" onClick={() => props.voteHandler('up', 'down', unChangableName)}><span role="img" aria-label="upVote">👍</span></button>
                        <p className="votes">{votat} vota</p>
                        <button className="down" onClick={() => props.voteHandler('down', 'up', unChangableName)}><span role="img" aria-label="upVote">👎</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RecetaBig);