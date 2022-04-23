import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import Home from '@/views/Home';

const routes = [
  { path: '/', component: Home },
  // { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
