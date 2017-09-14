

import Home from './routes/home.js';
import About from './routes/about.js';
import Main from './routes/main.js';
import Wish from './routes/wish.js';
import Wishes from './routes/wishes.js';
import UserWish from './routes/userwishes.js';

const routes = [
  { path: '/', component: Home, label: 'Home', visible: false },
  { path: '/about', component: About, label: 'About', visible: true },
  { path: '/wish', component: Main, label: 'Make a Wish', visible: true },
  { path: '/userwishes', component: UserWish, label: 'My Wishes', visible: true },
  { path: '/wishes', component: Wishes, label: 'Recent Wishes', visible: true },
  { path: '/wish/:id', component: Wish, label: 'Wish', visible: false },
];

const router = new VueRouter({ routes });

export default router;