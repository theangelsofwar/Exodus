import Web3 from 'web3';


interface Window {
  ethereum: any;
  web3: any;
  addEventListener: any
}
declare var window: Window;


export default() => new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3: any = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
          return web3;
        } catch(error) {
          reject(error);
        }
      } else if(window.web3) {
        const web3: any = window.web3;
        //legacey dApp browser
        console.log('Web3 detected');
        resolve(web3);
        return web3;
      } else {
        const provider: any = new Web3.providers.HttpProvider('http://localhost:7545');
        const web3: any = new Web3(provider);
        console.log("No web3 instance, use locals");
        resolve(web3);

        return web3;
      }
  })
});