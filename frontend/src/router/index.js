import { createRouter, createWebHistory } from "vue-router";
import OrdersOverview from "../components/OrdersOverview.vue";
import OrderDetails from "../components/OrdersDetails.vue";

const routes = [
  { path: "/orders", component: OrdersOverview },
  { path: "/orders/:id", component: OrderDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
