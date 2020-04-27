import React ,{ Component } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
import ExodusList from './ExodusList';
import { EXODUS_ABI, EXODUS_ADDRESS } from './config';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const exodusList = new web3.eth.Contract(EXODUS_LIST_ABI, EXODUS_LIST_ADDRESS);
    this.setState({ exodusList});
    const exodusCount = await exodusList.methods.exodusCount().call();
    this.setState({ exodusCount });
    for(let i = 0; i < exodusCount; i++){
      const exodus = await exodusList.methods.exodusArray(i).call();
      this.setState({
        exodusArray: [...this.state.exodusArray, exodus]
      });
    }
    this.setState({ loading: false })
  }

  constructor(props) {
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

  createExodus(content){
    this.setState({ loading: true });
    this.state.exodusList.methods.createExodus(content).send({ from: this.state.account });
    .once('receipt', (receipt) => {
      console.log('receipt', receipt);
      this.setState({ loading: false });
    });
  }

  toggleCompleted(exodusId){
    this.setState({ loading: true });
    this.state.exodusList.methods.toggleCompleted(taskId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false });
    });
  }

  render(){
    return(
      <div className="app">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://angiechangpagne.com" > Exodus</a>
          <ul className="navbar-nav px-3">
            
          </ul>
        </nav>
        <div className="container-fluid">
          <main>
            { this.state.loading 
            ? <div id="loader">Loading...</div>  
            : <ExodusList 
              exodusArray={this.state.exodusArray} 
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
