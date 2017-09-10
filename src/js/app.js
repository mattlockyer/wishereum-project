

//app.js
import VueMaterial from 'vue-material';
import { router } from './router';

Vue.use(VueRouter);
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'white',
  accent: 'blue',
  warn: 'orange',
  background: 'white'
});

Vue.material.registerTheme('second', {
  primary: 'blue',
  accent: 'blue',
  warn: 'orange',
  background: 'white'
});


const VueApp = new Vue({
  el: '#app',
  router,
  data: {
    menu: []
  },
  methods: {
    closeNav() {
      setTimeout(() => this.$refs.leftSidenav.close(), 100);
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  }
});

window.onload = () => VueApp.init();
