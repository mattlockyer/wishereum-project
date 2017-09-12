

export default `
  <div class="page">
    <md-layout md-align="center" :md-gutter="true">
    
      <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
      
        <div>
          <md-image md-src="/img/well.jpg"></md-image>
        </div>
    
        
        <md-whiteframe md-elevation="1" v-for="(wish, key) in wishes" class="whiteframe">
          <div class="wish">{{ wish[0] }}</div>
          <div class="amount">{{ wish[1] }} ETH</div>
          <div class="address">From: {{ wish[2] }}</div>
        </md-whiteframe>
        
      </md-layout>
    </md-layout>
  </div>
`