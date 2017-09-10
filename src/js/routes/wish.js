

import { getWeb3, getAccounts, getContract } from '../web3-utils';
import Wish from '../../../build/contracts/Wish.json';


export default {
  data() {
    return {
      wishes: [],
    };
  },
  created() {
    //jshint ignore:start
    (async() => {
      getWeb3();
      this.accounts = await getAccounts();
      const contract = this.contract = await getContract(Wish);
      //get wishes
      const totalWishes = (await contract.totalWishes.call()).toNumber();
      for (let i = totalWishes - 1; i >= Math.max(totalWishes - 10, 0); i--) {
        this.wishes.push(await contract.wishes.call(i));
      }
    })();
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