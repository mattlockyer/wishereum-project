


import Main from './routes/main.js';
import Wish from './routes/wish.js';
import About from './routes/about.js';

const routes = [
  { path: '/', component: Main },
  { path: '/wish', component: Wish },
  { path: '/about', component: About },
];

const router = new VueRouter({ routes });

export {
  router
};