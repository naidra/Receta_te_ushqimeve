import React from 'react';
import { NavLink } from 'react-router-dom';

function Receta({ receta, loggedAs, deleteHandler, updateHandler, voteHandler }) {
    const butoniFshije = receta.autori === loggedAs ? <button onClick={() => deleteHandler(receta.unChangableName)} className="delete">&times;</button> : null;
    const butoniNdrysho = receta.autori === loggedAs ? <button onClick={() => updateHandler(receta)} className="update">✎</button> : null;
    
    return (
        <li className="receta">
            <NavLink to={`/receta/${receta.unChangableName}`}><img src={receta.fotoUrl} alt="foto" /></NavLink>
            <div className="textDiv">
                <NavLink to={`/receta/${receta.unChangableName}`}>{receta.emri}</NavLink>
                <p className="date">Postuar më: { receta.dataEPostimit }.</p>
            </div>
            <div className="buttonWrapper">{ butoniFshije }{ butoniNdrysho }</div>
            <div className="upDownVote">
                <button className="up" onClick={() => voteHandler('up', 'down', receta.unChangableName)}><span role="img" aria-label="upVote">👍</span></button>
                <p className="votes">{receta.votat} vota</p>
                <button className="down" onClick={() => voteHandler('down', 'up', receta.unChangableName)}><span role="img" aria-label="upVote">👎</span></button>
            </div>
        </li>
    )
}

export default Receta;