

export default {
  
  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
        <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
            
          <h2>An Ethereum Wishing Well</h2>
          
          <div>
            <img src="/img/well.jpg" />
          </div>
          
          <p>Wishereum allows anyone to make a <strong>permanent</strong> wish on the Ethereum Blockchain</p>
          
          <h4>Getting Started</h4>
          
          <p>
            1. Please install <a href="https://metamask.io/">MetaMask</a> or visit Wishereum using your favorite DApp browser.
          </p>

          <p>
            2. Connect to the <a href="https://rinkeby.etherscan.io/">Rinkeby</a> network in order to make a wish.
          </p>
        
        </md-layout>
      </md-layout>
    </div>
  `
};