import React, { Component } from 'react';

class ShtoRecet extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fotoShowHandler = this.fotoShowHandler.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const dataSot = (new Date()).toDateString().split(' ');
        dataSot.shift();

        const recetData = {
            autori: this.props.userData.uName || this.props.userData.uEmail,
            emri: this.refs.emri.value,
            unChangableName: this.refs.emri.value,
            kategoria: this.refs.kategoria.value,
            perberja: this.refs.përmbajtja.value,
            pergatitja: this.refs.pergatitja.value,
            votat: 0,
            dataEPostimit: dataSot.join(' ')
        };
        const props = this.props,
            reader = new FileReader();
        reader.onloadend = function() {
            recetData.fotoUrl = this.result;
            props.addRecetHandler(recetData, true);
        };
        reader.readAsDataURL(this.refs.foto.files[0]);
    }
    fotoShowHandler(e) {
        if(!e.target.files.length) return;
        const reader = new FileReader(),
            refs = this.refs;
        reader.onloadend = function() {
            refs.fotoDisplay.setAttribute('src', this.result);
            refs.fotoDisplay.style.setProperty('display', 'block');
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    render() {
        if(!this.props.toAdd) return null;
        return (
            <div className="shtoRecetModal">
                <form onSubmit={this.handleSubmit}>
                    <button className="exitModal-btn" onClick={this.props.toggleShtoRecet}>&times;</button>
                    <p className="formTitle">Shto një recetë</p>
                    <img ref="fotoDisplay" src="#" alt="fotoDisplay" className="fotoDisplay" />
                    <label htmlFor="foto">Foto:</label>
                    <input ref="foto" type="file" name="foto" id="foto" onChange={this.fotoShowHandler} required />
                    <label htmlFor="emri">Emri:</label>
                    <input ref="emri" type="text" name="emri" id="emri" required />
                    <label htmlFor="përmbajtja">Përmbajtja:</label>
                    <textarea ref="përmbajtja" type="text" name="përmbajtja" id="përmbajtja" required></textarea>
                    <label htmlFor="pergatitja">Pergatitja:</label>
                    <textarea ref="pergatitja" type="text" name="pergatitja" id="pergatitja" required></textarea>
                    <label htmlFor="kategoria">Kategoria:</label>
                    <select ref="kategoria" name="kategoria" id="kategoria">
                        <option value="sallata">Sallata</option>
                        <option value="gjellëra">Gjellëra</option>
                        <option value="tradicionale">Tradicionale</option>
                        <option value="brumëra">Brumëra</option>
                        <option value="supa">Supa</option>
                    </select>
                    <button className="submitRecet-btn">Shto recetën</button>
                </form>
            </div>
        )
    }
}

export default ShtoRecet;