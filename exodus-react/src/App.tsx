// import { EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS } from './config';
// import * as  Web3 from 'web3';
import React, { Component } from 'react';
import './App.css';
import ExodusList from './ExodusList';
// import 'ethereumjs-testrpc';
import Web3 from 'web3';
//exodus list is the smart contract, while exodusArray is the entire list iteself

//creating a closure
var wa = window as any;
if (window.hasOwnProperty('web3')) {
  wa.web3 = new Web3(wa.web3.currentProvider);
} else {
  wa.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}
//<ExodusList> & Readonly<{}> & Readonly<{ children?: ReactNode; }>

class App extends Component<{}, 
{ 
  account: any,
  exodusCount: any,
  exodusArray: ReadonlyArray<{}>,
  exodusListContract: Readonly<{}>,
  loading: any,
  web3: any,
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      exodusCount: 0,
      exodusArray: [],
      exodusListContract: [],
      loading: true,
      web3: wa.web3,
    }
    this.createExodus = this.createExodus.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentWillMount() {
    var web3 = wa.web3;
    //new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    this.setState({ web3 });
    this.loadBlockchainData();
  }

  async loadBlockchainData () {
    const web3 = wa.web3;
    //this.state.web3;
    //new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = await web3.eth.accounts[0];
    this.setState({ account: accounts[0] });

    const exodusContract = new web3.eth.Contract([
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
    ]);
    const exodusListContract = exodusContract.at(0x43ea664467C2572B4e8B3E9c9f627EFB14D8BbF9);
    this.setState({ exodusListContract });
    const exodusCount = await exodusListContract.methods.exodusCount().call();
    this.setState({ exodusCount });
    for(let i = 1; i <= exodusCount; i++) {
      //  holy fucking shit the reason is that solidity indexes at 1 dumb fucking bitch
      let exodus = await exodusListContract.methods.exodusArray(i).call(); //gets are .call() and do not require, ether, 
      this.setState({
        exodusArray: [...this.state.exodusArray, exodus]
      })
    }
    this.setState({ loading: false })
  }

  createExodus(content: string) {
    this.setState({ loading: true });
    this.state.exodusListContract.methods.createExodus(content).send({ from: this.state.account })
    .on('receipt', (receipt: any) => {
      console.log('receipt', receipt);
      //sends require ether
      this.setState({ loading: false });
    })
  }

  toggleCompleted(exodusId: number) {
    this.setState({ loading: true });
    this.state.exodusListContract.methods.toggleCompleted(exodusId).send({ from: this.state.account })
    .on('receipt', (receipt: any) => {
      this.setState({ loading: false });
    });
  }
  //essentially you are accessing the current exodusList that is the interceptor between the blockchain and the current client, you invoke the function from their contract abi address that is declared as public, then you must send ether on the transaction for the decentralized application
  //and the ether is sent from you current account detected through metamask in the browser, and it communicates with ganache in the truffle cli - so you have to make sure that a. the ports are all matched up and in sync, b. test networks are aligned c. ropsten must be on server for solidity and client side and brower's mask. 

  render() {
    return(
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default App;
