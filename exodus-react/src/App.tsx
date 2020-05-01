// import { EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS } from './config';
// import * as  Web3 from 'web3';
import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import ExodusList from './ExodusList';
import TruffleContract from 'truffle-contract';
// import 'ethereumjs-testrpc';
import Web3 from 'web3';
//exodus list is the smart contract, while exodusArray is the entire list iteself

//creating a closure
var whereyouat = window as any;


const initialState : any = {
  accounts: [],
  exodusContract: {},
  web3: {},
  ccount: '0x0',
  exodusCount: 0,
  exodusArray: [],
  loading: true
};

const reducer = (state: any, action: any) => ({
    accounts: action.accounts,
    exodusContract: action.exodusContract,
    web3: action.web3
  })

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState('none');


  useEffect(() => {

  })
  accounts: [],
  exodusContract: {},
  web3: {},
  ccount: '0x0',
  exodusCount: 0,
  exodusArray: [],
  loading: true


    if (whereyouat.hasOwnProperty('web3') || typeof web3 != 'undefined') {
      whereyouat.web3 = new Web3(whereyouat.web3.currentProvider);
      this.web3Provider = web3.currentProvider;
    } else {
      whereyouat.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      this.web3Provider = whereyouat.web3;
    }
    var exodusListContract;
    //<ExodusList> & Readonly<{}> & Readonly<{ children?: ReactNode; }>
    this.web3 = new Web3(this.web3Provider);
    this.exodusContract = TruffleContract(ExodusList);
    this.exodusContract.setProvider(this.web3Provider);


    this.createExodus = this.createExodus.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  

  
    this.loadBlockchainData();

  const loadBlockchainData = async () =>  {
    const web3 = whereyouat.web3;
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
    exodusListContract = exodusContract.at(0x43ea664467C2572B4e8B3E9c9f627EFB14D8BbF9);
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

  const createExodus = (content: string) => {
    this.setState({ loading: true });
    exodusListContract.methods.createExodus(content).send({ from: this.state.account })
    .on('receipt', (receipt: any) => {
      console.log('receipt', receipt);
      //sends require ether
      this.setState({ loading: false });
    })
  }

 const toggleCompleted = (exodusId: number) => {
    this.setState({ loading: true });
    exodusListContract.methods.toggleCompleted(exodusId).send({ from: this.state.account })
    .on('receipt', (receipt: any) => {
      this.setState({ loading: false });
    });
  }
  //essentially you are accessing the current exodusList that is the interceptor between the blockchain and the current client, you invoke the function from their contract abi address that is declared as public, then you must send ether on the transaction for the decentralized application
  //and the ether is sent from you current account detected through metamask in the browser, and it communicates with ganache in the truffle cli - so you have to make sure that a. the ports are all matched up and in sync, b. test networks are aligned c. ropsten must be on server for solidity and client side and brower's mask. 

 
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
    )
}

export default App;
