import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import base from './base';
import { bake_cookie, read_cookie } from 'sfcookies';
import Header from './components/Header';
import SubNav from './components/SubNav';
import ContentWrapper from './components/ContentWrapper';
import Footer from './components/Footer';
import ShtoRecet from './components/ShtoRecet';
import RecetaBig from './components/RecetaBig';
import NdryshoRecet from './components/UpdateRecetPopup';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        uId: null
      },
      recetat: null,
      shtoRecetPopup: false,
      updateRecet: null
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.filtroRecetat = this.filtroRecetat.bind(this);
    this.toggleShtoRecet = this.toggleShtoRecet.bind(this);
    this.addRecetHandler = this.addRecetHandler.bind(this);
    this.fshijeReceten = this.fshijeReceten.bind(this);
    this.ndryshoRecetenPopup = this.ndryshoRecetenPopup.bind(this);
    this.largoNdryshoReceten = this.largoNdryshoReceten.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
  }
  componentWillMount() {
    this.ref = base.syncState('/krejtRecetat', {
      context: this,
      state: 'recetat',
      then: function() {
        this.filtroRecetat();
      }
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentDidMount() {
    base.onAuth(user => {
      if(user) this.authHandler(null, { user });
    });
  }
  filtroRecetat() {
    const word = this.props.location.pathname.substr(1);
    const recetIndexes = Object.keys(this.state.recetat);
    return recetIndexes.filter(recetName => {
      if(!this.state.recetat[recetName].kategoria) return false;
      return (!word.length ? true : ~this.state.recetat[recetName].kategoria.indexOf(word));
    }).map(recetName => this.state.recetat[recetName]);
  }
  loginHandler(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }
  authHandler(err, authData) {
    if(err) {
      console.error(err);
      return;
    }

    const userInfo = authData.user.providerData[0];
    const userData = {
      uId: authData.user.uid,
      uName: userInfo.displayName,
      provider: userInfo.providerId,
      uEmail: userInfo.email
    };
    this.setState({ userData });
  }
  logoutHandler() {
    base.unauth();
    this.setState({ userData: {} });
  }
  toggleShtoRecet() {
    const isShown = this.state.shtoRecetPopup;

    this.setState({ shtoRecetPopup: !isShown });
  }
  addRecetHandler(recet, firstAdd) {
    const recetat = {
      ...this.state.recetat,
      [recet.unChangableName]: recet
    };
    
    this.setState({ recetat });
    if(firstAdd) this.toggleShtoRecet();
    else this.largoNdryshoReceten();
  }
  fshijeReceten(recetName) {
    if(!window.confirm(`A dëshironi ta fshini recetën: ${recetName}.`)) return;
    const recetat = {...this.state.recetat};
    recetat[recetName] = null;
    this.setState({ recetat });
  }
  ndryshoRecetenPopup(receta) {
    console.log('----> ', receta);
    this.setState({ updateRecet: receta });
  }
  largoNdryshoReceten() {
    this.setState({ updateRecet: null });
  }
  voteHandler(dir, diffDir, recetName) {
    const votatRecet = (read_cookie('votatRecet').length && JSON.parse(read_cookie('votatRecet'))) || {};

    if(!votatRecet.hasOwnProperty(recetName + '-' + dir)) {
      const recetat = {...this.state.recetat};
      let votat = +recetat[recetName].votat;

      (dir === 'up') ? (votat += 1) : (votat -= 1);
      if(!votatRecet.hasOwnProperty(recetName + '-' + diffDir))
        votatRecet[recetName + '-' + dir] = '1';

      if(votatRecet.hasOwnProperty(recetName + '-' + diffDir))
        delete votatRecet[recetName + '-' + diffDir];
      
      recetat[recetName].votat = votat;
      this.setState({ recetat });
      bake_cookie('votatRecet', JSON.stringify(votatRecet));
    }
  }
  render() {
    return (
      <div className="App">
        <Header
          userData={this.state.userData}
          loginHandler={this.loginHandler}
          logoutHandler={this.logoutHandler}
          toggleShtoRecet={this.toggleShtoRecet}
          />
        <SubNav />
        <Switch>
          <Route exact path="/receta/:catId" render={() =>
            <RecetaBig
              userData={this.state.userData}
              recetat={this.state.recetat}
              voteHandler={this.voteHandler} />}
              />
          <Route path="/" render={() =>
            <ContentWrapper
              userData={this.state.userData}
              recetat={this.state.recetat}
              filtroRecetat={this.filtroRecetat}
              fshijeReceten={this.fshijeReceten}
              ndryshoReceten={this.ndryshoRecetenPopup}
              voteHandler={this.voteHandler} />}
              />
        </Switch>
        <Footer />
        <ShtoRecet
          toAdd={this.state.shtoRecetPopup}
          userData={this.state.userData}
          toggleShtoRecet={this.toggleShtoRecet}
          addRecetHandler={this.addRecetHandler}
          />
        <NdryshoRecet
          userData={this.state.userData}
          updateRecet={this.state.updateRecet}
          largoNdryshoReceten={this.largoNdryshoReceten}
          addRecetHandler={this.addRecetHandler}
          />
      </div>
    )
  }
}

export default withRouter(App);
