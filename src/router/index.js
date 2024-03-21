import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "todo" */ '../views/HomeView.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    // route level code-splitting
    // this generates a separate chunk (todo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todo" */ '../views/TodoView.vue')
  }
  ,
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (todo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todo" */ '../views/SignUpView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
