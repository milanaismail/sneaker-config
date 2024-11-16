import { createRouter, createWebHistory } from "vue-router";
import AdminLogin from "../components/AdminLogin.vue";
import OrdersOverview from "../components/OrdersOverview.vue";

const routes = [
  { path: "/login", component: AdminLogin }, // Login page
  { path: "/orders", component: OrdersOverview }, // Orders overview
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
