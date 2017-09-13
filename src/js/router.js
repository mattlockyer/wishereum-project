

import About from './routes/about.js';
import Main from './routes/main.js';
import Wish from './routes/wish.js';
import Wishes from './routes/wishes.js';
import UserWish from './routes/userwishes.js';

const routes = [
  { path: '/about', component: About },
  { path: '/', component: Main },
  { path: '/wish/:id', component: Wish },
  { path: '/userwishes', component: UserWish },
  { path: '/wishes', component: Wishes },
];

const router = new VueRouter({ routes });

export default router;