import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  { path: '/', component: () => import('@/views/Home/Index.vue'), title: 'home' },
  { path: '/about', component: () => import('@/views/About/Index.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
