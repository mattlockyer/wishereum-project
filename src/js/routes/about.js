

export default {

  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
        <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
            
          <h2>An Ethereum Wishing Well</h2>
          
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
          
          <p>Wishereum allows anyone to make a <strong>permanent</strong> wish on the Ethereum Blockchain</p>
          <p v-if="APP.offchain">
          
            METAMASK
          
          </p>
        
        </md-layout>
      </md-layout>
    </div>
  `
};