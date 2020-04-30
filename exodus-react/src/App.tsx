import { EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS } from './config';
import Web3 from 'web3';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExodusList from './ExodusList';
import 'ethereumjs-testrpc';

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

  async loadBlockchainData (){
    var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const exodusList = new web3.eth.Contract([
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "exodusArray",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "completed",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x31083c35"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "exodusCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf272981e"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "content",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "completed",
            "type": "bool"
          }
        ],
        "name": "ExodusCreated",
        "type": "event",
        "signature": "0xda9c69875c8bda438cb662aeb1b1ec3345465461e7b73b80eabef4ea3ce1b955"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "completed",
            "type": "bool"
          }
        ],
        "name": "ExodusCompleted",
        "type": "event",
        "signature": "0xc307b46956092b7b032ee91ff3d43bc0e144e7db2efb6077ddcd6a5dfdb5dfdd"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_content",
            "type": "string"
          }
        ],
        "name": "createExodus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x3fa00ba9"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "toggleCompleted",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x455f5024"
      }
    ], 0x43ea664467C2572B4e8B3E9c9f627EFB14D8BbF9);
    this.setState({ exodusList });
    const exodusCount = await exodusList.methods.exodusCount().call();
    this.setState({ exodusCount });
    for(let i = 1; i <= exodusCount; i++) {
      //  holy fucking shit the reason is that solidity indexes at 1 dumb fucking bitch
      let exodus = await exodusList.methods.exodusArray(i).call();
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
