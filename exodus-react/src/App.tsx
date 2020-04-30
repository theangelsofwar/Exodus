import { EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS } from './config';
import Web3 from 'web3';
import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import ExodusList from './ExodusList';

//exodus list is the smart contract, while exodusArray is the entire list iteself
// interface Props {
//   account: any,
//   exodusCount: any,
//   exodusArray: any,
//   exodusList: any,
//   loading: any
// }
class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      exodusCount: 0,
      exodusArray: [],
      exodusList: [],
      loading: true
    }
    this.createExodus = this.createExodus.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentWillMount() {
    this.loadBlockchainData();
  }
  async loadBlockchainData() {
    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    var accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    var exodusList = new web3.eth.Contract(EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS);
    this.setState({ exodusList });
    var exodusCount = await exodusList.methods.exodusCount().call();
    this.setState({ exodusCount });
    for(let i = 1; i <= exodusCount; i++) {
      //  holy fucking shit the reason is that solidity indexes at 1 dumb fucking bitch
      var exodus = await exodusList.methods.exodusArray(i).call();
      this.setState({
        exodusArray: [...this.state.exodusArray, exodus]
      })
    }
    this.setState({ loading: false })
  }


  createExodus(content: any){
    this.setState({ loading: true });
    this.state.exodusList.methods.createExodus(content).send({ from: this.state.account })
    .once('receipt', (receipt: any) => {
      console.log('receipt', receipt);
      this.setState({ loading: false })
    })
  }

  toggleCompleted(exodusId: any){
    this.setState({ loading: true });
    this.state.exodusList.methods.toggleCompleted(exodusId).send({ from: this.state.account })
    .once('receipt', (receipt: any) => {
      this.setState({ loading: false });
    });
  }
  //essentially you are accessing the current exodusList that is the interceptor between the blockchain and the current client, you invoke the function from their contract abi address that is declared as public, then you must send ether on the transaction for the decentralized application
  //and the ether is sent from you current account detected through metamask in the browser, and it communicates with ganache in the truffle cli - so you have to make sure that a. the ports are all matched up and in sync, b. test networks are aligned c. ropsten must be on server for solidity and client side and brower's mask. 

  render() {
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
            ? (<div id="loader">Loading...</div>)  
            : (<ExodusList 
              exodusArray={this.state.exodusArray} 
              createExodus={this.createExodus}
              toggleCompleted={this.toggleCompleted} 
            />)
            }
          </main>
        </div>
      </div>
    );
  }
}

export default App;
