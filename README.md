# Exodus
A Mass Migration into Web3 as we venture to the age of decentralization

Goals of Building a Decentralized React MVP:
1. Reading and Writing Data from a block chain
2. Business Logic to run application purpose


Note: create-react-app is no longer global, if it is in your global directory, use:
> npm install -g create-react-app

Then: 
> npx create-react-app exodus --template typescript 
tsconfig has already been added

It is recommended to use a type system as smart contracts on the blockchain are immutable. 

If you decide to use prop-types with Javascript, just remember that prop-types will show errors during runtime while typescript types will not pass compile time. 


Different Types of Networks on Ether:
1. Local Network: Ganache 
2. Testnet(ropsten, rinkeby, )
3. Mainnet(Requires ETH)

We will be developing on the local Ganache Network, 
Download https://www.trufflesuite.com/ganache

Install a wallet like MetaMask for the browser to interact with the Ether Blockchain. 
Add to Chrome: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en

Create a metamask account and be sure to store the credentials, since it is on the blockchain, if lost, you cannot retrieve it again. This is the tradeoff of the inherent annonymity of the Ether.  
Metamask does this by injecting the scope of Ethereum Blockchain into the browser once it is configured through through. 

> npm install -g truffle@5.0.2

Switch to top Folder in order to create a "Server" Folder
> truffle init
Creates a contracts and migrations folder
> touch package.json
Install dependencies in root folder
> 

Necessary:

> Solidy Contracts
> Ganache(A Truffle IDE)
> Metamask-
> A version of Web3, Web3js, 


In the Migrations.sol folder in contracts, 
Make Sure the version is exact
> pragma solidity ^0.5.0;

Migrations are essentially action triggers, or dispatched actions, as the entire blockchain can only have a single state in a moment in time. 
> change the contract name to the purpose of the business logic of the applciation, eg "ToDontList"

> truffle compile


In order to run the contract on a personal blockchain their config must match ganache defaults, so change the truffle-config by uncommenting the following sections:
- truffle-config.js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}


In the root folder:
> touch migrations/2_deploy_contracts.js

Each time a new smart contract is created programmtically updates the state through a migration. 

Create the migration file:
const Exodus = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Exodus);
};


- 2_deploy_contracts.js:

module.exports = function(deployer) {
  deployer.deploy(Exodus);
};



With ganache open:
> truffle migrate

> truffle console
In the cconsole:
> exodus = await Migrations.deployed()


add functionality to the contract, and reset the migrate
> truffle migrate --reset

> truffle console
> exodus = await Exodus.deployed()
Mapped as getting all

> exodus = await Exodus.deployed(1)
The Id 



Important React Dependencies:
> npm install react reactdom typescript 
> npm install web3
> npm install truffle



The ABI File:
The ABI is the application binary interface
- The smart contract ABI describes indexing and behavior. 
- contains the address of the smart contract

