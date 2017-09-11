

export default {
  
  data() {
    return {
      wishes: {}
    };
  },
  
  created() {
    this.update();
  },
  
  methods: {
    update() {
      localforage.getItem('wishereum-wishes').then((wishes) => {
        this.wishes = wishes || {};
        this.fetch();
      });
    },
    fetch() {
      let attempts = 0;
      const limit = 10;
      //jshint ignore:start
      const check = async() => {
        attempts++;
        const contract = APP.contract;
        if (!contract) {
          if (attempts === limit) return;
          console.log('checking again');
          setTimeout(check, 500);
          return;
        }
        //get wishes
        const totalWishes = (await contract.totalWishes.call()).toNumber();
        //loop through and fetch each wish from the blockchain, if we don't already have it stored locally
        
        //TODO What to do with BigNumber types?
        
        for (let i = totalWishes - 1; i >= 0; i--) {
          if (this.wishes[i] === undefined) this.wishes[i] = await contract.wishes.call(i);
        }
        
        localforage.setItem('wishereum-wishes', this.wishes).then(() => {
          console.log('stored wishes locally');
        });
        this.$forceUpdate();
      };
      //jshint ignore:end
      check();
    }
  },
  
  template: `
    <div class="margin-16">
      <md-layout md-align="center" :md-gutter="true">
      
        <md-layout md-flex="35" md-flex-xsmall="80">
        
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
      
      
          <div v-for="(wish, key) in wishes">
            <p>{{ wish[0] }}</p>
            <p>{{ wish[1] }}</p>
            <p>{{ wish[2] }}</p>
          </div>
          
        </md-layout>
      </md-layout>
    </div>
  `
};