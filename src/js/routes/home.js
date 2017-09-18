

export default {
  
  data() {
    return {
      loaded: false,
      offchain: true
    };
  },
  
  created() {
    if (APP.initialized) this.load();
    else {
      this.$parent.$off('update');
      this.$parent.$on('update', this.load);
    }
  },
  
  methods: {
    load() {
      this.offchain = APP.offchain;
      this.loaded = true;
    },
  },

  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
        <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
          
          <div>
            <img src="/img/well.jpg" />
          </div>
          
          <h2>The Ethereum Wishing Well</h2>
          
          <p>Make a <strong>permanent</strong> wish on the Ethereum Blockchain</p>
          
          <md-layout v-if="loaded && !offchain" md-flex="100" md-align="center">
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