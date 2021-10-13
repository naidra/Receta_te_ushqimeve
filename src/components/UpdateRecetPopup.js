import React, { Component } from 'react';

class NdryshoRecet extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fotoShowHandler = this.fotoShowHandler.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const recetData = {
            autori: this.props.userData.uName || this.props.userData.uEmail,
            emri: this.refs.emri.value,
            kategoria: this.refs.kategoria.value,
            perberja: this.refs.përmbajtja.value,
            pergatitja: this.refs.pergatitja.value,
            unChangableName: this.refs.unChangableName.value,
            votat: this.refs.votat.value,
            dataEPostimit:this.refs.dataEPostimit.value
        };
        if(this.refs.foto.files.length) {
            const props = this.props,
                reader = new FileReader();
            reader.onloadend = function() {
                recetData.fotoUrl = this.result;
                props.addRecetHandler(recetData);
            };
            reader.readAsDataURL(this.refs.foto.files[0]);
        } else {
            recetData.fotoUrl = this.refs.fotoDisplay.getAttribute('src');
            this.props.addRecetHandler(recetData);
        }
    }
    fotoShowHandler(e) {
        const reader = new FileReader(),
            refs = this.refs;
        reader.onloadend = function() {
            refs.fotoDisplay.setAttribute('src', this.result);
            refs.fotoDisplay.style.setProperty('display', 'block');
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    render() {
        if(!this.props.updateRecet) return null;
        const { fotoUrl, emri, perberja, pergatitja, kategoria, votat, dataEPostimit, unChangableName } = this.props.updateRecet;
        return (
            <div className="shtoRecetModal" action="/">
                <form onSubmit={this.handleSubmit}>
                    <button className="exitModal-btn" onClick={this.props.largoNdryshoReceten}>&times;</button>
                    <p className="formTitle">Ndrysho recetën</p>
                    <img ref="fotoDisplay" src={fotoUrl} alt="fotoDisplay" className="fotoDisplay on" />
                    <label htmlFor="foto">Ndrysho foton:</label>
                    <input ref="foto" type="file" name="foto" id="foto" onChange={this.fotoShowHandler} />
                    <label htmlFor="emri">Emri:</label>
                    <input ref="emri" type="text" name="emri" id="emri" required defaultValue={emri} />
                    <input ref="unChangableName" type="hidden" name="unChangableName" defaultValue={unChangableName} />
                    <input ref="votat" type="hidden" name="votat" defaultValue={votat} />
                    <input ref="dataEPostimit" type="hidden" name="dataEPostimit" defaultValue={dataEPostimit} />
                    <label htmlFor="përmbajtja">Përmbajtja:</label>
                    <textarea ref="përmbajtja" type="text" name="përmbajtja" id="përmbajtja" required  defaultValue={perberja}></textarea>
                    <label htmlFor="pergatitja">Pergatitja:</label>
                    <textarea ref="pergatitja" type="text" name="pergatitja" id="pergatitja" required defaultValue={pergatitja}></textarea>
                    <label htmlFor="kategoria">Kategoria:</label>
                    <select ref="kategoria" name="kategoria" id="kategoria" defaultValue={kategoria}>
                        <option value="sallata">Sallata</option>
                        <option value="gjellëra">Gjellëra</option>
                        <option value="tradicionale">Tradicionale</option>
                        <option value="brumëra">Brumëra</option>
                        <option value="supa">Supa</option>
                    </select>
                    <button type="submit" className="submitRecet-btn">Ndrysho recetën</button>
                </form>
            </div>
        )
    }
}

export default NdryshoRecet;