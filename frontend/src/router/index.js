import { createRouter, createWebHistory } from "vue-router";
import OrdersOverview from "../components/OrdersOverview.vue";
import OrderDetails from "../components/OrdersDetails.vue";
import AdminLogin from "../components/AdminLogin.vue";

const routes = [
{ path: "/login", component: AdminLogin }, // Admin Login Page
  { path: "/orders", component: OrdersOverview },
  { path: "/orders/:id", component: OrderDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
