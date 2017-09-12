

import Main from './routes/main.js';
import Wish from './routes/wishes.js';
import UserWish from './routes/userwishes.js';
import About from './routes/about.js';

const routes = [
  { path: '/about', component: About },
  { path: '/', component: Main },
  { path: '/userwishes', component: UserWish },
  { path: '/wishes', component: Wish },
];

const router = new VueRouter({ routes });

export {
  router
};