import React, { Component } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
import { EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS } from './config';
import ExodusList from './ExodusList';

interface Props {
  currentAccount: any,
  exodusCount: any,
  localExodusArray: any,
  exodusList: any,
  loading: any
}


class App extends Component {
  constructor(props: Props){
    super(props);
    this.state = {
      currentAccount: '',
      exodusCount: 0,
      localExodusArray: [],
      exodusList: [],
      loading: true
    }
    this.createExodus = this.createExodus.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ currentAccount: accounts[0] });
    const exodusList = new web3.eth.Contract(EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS);
    this.setState({ exodusList});
    const exodusCount = await exodusList.methods.exodusCount().call();
    this.setState({ exodusCount });
    for(var i = 1; i <= exodusCount; i++){
      //  holy fucking shit the reason is that solidity indexes at 1 dumb fucking bitch
      const exodus = await exodusList.methods.exodusArray(i).call();
      this.setState({
        localExodusArray: [...this.state.localExodusArray, exodus]
      })
    }
    this.setState({ loading: false })
  }


  createExodus(content: any){
    this.setState({ loading: true });
    this.state.exodusList.methods.createExodus(content).send({ from: this.state.currentAccount })
    .once('receipt', (receipt: any) => {
      console.log('receipt', receipt);
      this.setState({ loading: false });
    });
  }

  toggleCompleted(exodusId: any){
    this.setState({ loading: true });
    this.state.exodusList.methods.toggleCompleted(exodusId).send({ from: this.state.currentAccount })
    .once('receipt', (receipt: any) => {
      this.setState({ loading: false });
    });
  }

  render(){
    return(
      <div className="app">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://angiechangpagne.com" > Exodus </a>
          <ul className="navbar-nav px-3">
            
          </ul>
        </nav>
        <div className="container-fluid">
          <main>
            { this.state.loading 
            ? <div id="loader">Loading...</div>  
            : <ExodusList 
              exodusArray={this.state.localExodusArray} 
              createExodus={this.createExodus}
              toggleCompleted={this.toggleCompleted} 
            />
            }
          </main>
        </div>
      </div>
    );
  }
}

export default App;
