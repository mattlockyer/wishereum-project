


import Main from './routes/main.js';
import About from './routes/about.js';

const routes = [
  { path: '/', component: Main },
  { path: '/about', component: About },
];

const router = new VueRouter({ routes });

export {
  router
};