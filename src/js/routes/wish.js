

export default {
  
  data() {
    return {
      wishes: [],
    };
  },
  
  created() {
    //jshint ignore:start
    const check = async() => {
      const contract = APP.contract;
      if (!contract) {
        console.log('checking again');
        setTimeout(check, 500);
        return;
      }
      //get wishes
      const totalWishes = (await contract.totalWishes.call()).toNumber();
      
      console.log(totalWishes);
      
      for (let i = totalWishes - 1; i >= Math.max(totalWishes - 10, 0); i--) {
        this.wishes.push(await contract.wishes.call(i));
      }
    };
    check();
    //jshint ignore:end
  },
  
  methods: {
    
  },
  
  template: `
    <div class="margin-16">
      <md-layout md-align="center" :md-gutter="true">
      
        <md-layout md-flex="35" md-flex-xsmall="80">
        
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
      
      
          <div v-for="wish in wishes">
            <p>{{ wish[0] }} - {{ wish[1] }}</p>
            <p>{{ wish[2] }}</p>
          </div>
          
        </md-layout>
      </md-layout>
    </div>
  `
};