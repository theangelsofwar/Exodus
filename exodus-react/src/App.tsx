import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import ExodusListCompound from './ExodusListCompound';
import TruffleContract from 'truffle-contract';
// import 'ethereumjs-testrpc';
import * as ExodusList from './build/contracts/ExodusList.json'; //get abi, address directly 
import Web3 from 'web3';
import getWeb3 from './utils/getWeb3';
//exodus list is the smart contract, while exodusArray is the entire list iteself

//creating a closure
var whereyouat = window as any;
var contract: any;

const initialState : any = {
  accounts: [],
  exodusContract: {},
  web3: null,
  account: '0x0',
  exodusCount: 0,
  exodusArray: [],
  loading: true
};

const reducer = (state: any, action: any) => ({
    accounts: action.accounts,
    account: action.account,
    exodusContract: action.exodusContract,
    web3: action.web3
  })

const App = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [exodusCount, setExodusCount] = useState(0);
  const [exodusArray, setExodusArray] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState('0x0'); //genesis block
  const [exodusContract ,setExodusContract] = useState({});
  const [web3, setWeb3] = useState({});


  useEffect(() => {
    const init = async() => {
      try {
        const web3: any = await getWeb3();
        //the web3 is the provider from the helper util function

        const accounts: any = await web3.eth.getAccounts();
        const account: any = accounts[0];
        const networkId: number = await web3.eth.net.getId();

        const deployedNetwork = ExodusList.networks[networkId];
        //Contract.networks[networkId];

        var instance = new web3.eth.Contract([
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
        ],"0xf40846C34d2A4C20d426472C8CA07A699a737193");
        console.log('instance', instance);
        //var instance = contractInstance.at(0x43ea664467C2572B4e8B3E9c9f627EFB14D8BbF9);
      // deployedNetwork && deployedNetwork.address,

      //  contract = new TruffleContract(instance);

        dispatch({
          accounts, 
          account,
          exodusContract: instance, 
          web3
        });

      } catch(error) {
        alert(
          `Failed to load web3, accouts, or contract. Check console for details`,
        );
        console.log(error);
      }
    }
    init();
    loadBlockchainData();
  }, []);

  // accounts: [],
  // exodusContract: {},
  // web3: {},
  // ccount: '0x0',
  // exodusCount: 0,
  // exodusArray: [],
  // loading: true


  //   if (whereyouat.hasOwnProperty('web3') || typeof web3 != 'undefined') {
  //     whereyouat.web3 = new Web3(whereyouat.web3.currentProvider);
  //     this.web3Provider = web3.currentProvider;
  //   } else {
  //     whereyouat.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
  //     this.web3Provider = whereyouat.web3;
  //   }
  //   var exodusListContract;
  //   //<ExodusList> & Readonly<{}> & Readonly<{ children?: ReactNode; }>
  //   this.web3 = new Web3(this.web3Provider);
  //   this.exodusContract = TruffleContract(ExodusList);
  //   this.exodusContract.setProvider(this.web3Provider);


  //   this.createExodus = this.createExodus.bind(this);
  //   this.toggleCompleted = this.toggleCompleted.bind(this);  

  const loadBlockchainData = async() =>  {
    const { exodusContract, accounts, exodusArray}: any = state;
    // await exodusContract.methods.set('sent from mars').send({ from: accounts[0] }); 
    const exodusCount: any = await exodusContract.methods.exodusCount().call();
    //call(() => console.log('calling twice'));
    setExodusCount(exodusCount);
    const newExodusArray = [];
    for(let i = 1; i <= exodusCount; i++) {
      //  holy fucking shit the reason is that solidity indexes at 1 dumb fucking bitch
      let exodus = await exodusContract.methods.exodusArray(i).call().call(() => console.log('must call call() twice and change the node_modules in eth-contract conditionals')); //gets are .call() and do not require, ether, 
      newExodusArray.push(exodus);
    }
    setExodusArray(newExodusArray as any);
    setLoading(false);
    // const accounts = await web3.eth.getAccounts();
    // web3.eth.defaultAccount = await web3.eth.accounts[0];
    // this.setState({ account: accounts[0] });

    // const exodusContract = new web3.eth.Contract();
    // exodusListContract = exodusContract.at(0x43ea664467C2572B4e8B3E9c9f627EFB14D8BbF9);
    // this.setState({ exodusListContract });
  }

  const createExodus = (content: string) => {
    const { account, exodusContract }: any = state;
    setLoading(true);
    exodusContract.methods.createExodus(content).send({ from: account })
    .on('receipt', (receipt: any) => {
      console.log('receipt', receipt);
      //sends require ether
      setLoading(false);
    })
  }

 const toggleCompleted = (exodusId: number) => {
   const { account, exodusContract }: any = state;
   setLoading(true);
    exodusContract.methods.toggleCompleted(exodusId).send({ from: account })
    .on('receipt', (receipt: any) => {
      console.log(receipt);
      setLoading(false);
    });
  }
  //essentially you are accessing the current exodusList that is the interceptor between the blockchain and the current client, you invoke the function from their contract abi address that is declared as public, then you must send ether on the transaction for the decentralized application
  //and the ether is sent from you current account detected through metamask in the browser, and it communicates with ganache in the truffle cli - so you have to make sure that a. the ports are all matched up and in sync, b. test networks are aligned c. ropsten must be on server for solidity and client side and brower's mask. 

 
    return(
    
      <div className="app">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://angiechangpagne.com" > Exodus </a>
          <ul className="navbar-nav px-3">
            
          </ul>
        </nav>
        <div className="container-fluid">
          <main>
            { loading 
            ? (<div id="loader">Loading...</div>)  
            : (<ExodusListCompound
              exodusArray={exodusArray} 
              createExodus={createExodus}
              toggleCompleted={toggleCompleted} 
            />)
            }
          </main>
        </div>
      </div>
    )
}

export default App;
