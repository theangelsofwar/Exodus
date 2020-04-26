import React { useState, useEffect } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';

function App() {
  
  const [accounts, setAccounts] = useState([]);
  


  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccounts({ accounts }); //use of async
    //a web3 instance 
  };

  const blockchainData = loadBlockchainData();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
