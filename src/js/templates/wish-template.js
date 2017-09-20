

export default `
  <div class="page">
    <md-layout md-align="center" :md-gutter="true">
    
      <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
      
        <div class="well-badge">
          <img src="/img/well.png" />
        </div>
    
        <router-link v-for="(wish, key) in wishes" :to="'/wish/' + (wish[3] ? wish[3] : key)" exact>
          <md-whiteframe md-elevation="1" class="wish">
            <div class="text">{{ wish[0] }}</div>
            <div class="amount" v-if="wish[1] !== 'pending'">{{ wish[1] }} ETH</div>
            <div class="address">From: {{ wish[2] }}</div>
          </md-whiteframe>
        </router-link>
        
      </md-layout>
    </md-layout>
  </div>
`;