

export default {

  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
        <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
          
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
          
          <h2>The Ethereum Wishing Well</h2>
          
          <p>Make a <strong>permanent</strong> wish on the Ethereum Blockchain</p>
          
          <md-layout md-flex="100" md-align="center">
            <router-link to="/wish" exact v-on:click.native="updateRoute">
              <md-button class="md-raised">Make a Wish</md-button>
            </router-link>
          </md-layout>
          
          <md-layout md-flex="100" md-align="center">
            <router-link to="/wishes" exact v-on:click.native="updateRoute">
              <md-button class="md-raised">Recent Wishes</md-button>
            </router-link>
          </md-layout>
          
          <md-layout md-flex="100" md-align="center">
            <router-link to="/about" exact v-on:click.native="updateRoute">
              <md-button class="md-raised">About</md-button>
            </router-link>
          </md-layout>

        </md-layout>
      </md-layout>
    </div>
  `
};