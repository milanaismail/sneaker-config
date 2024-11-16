<template>
    <div>
      <h1>Orders</h1>
      <ul>
        <li v-for="order in orders" :key="order.id">
          Shoe Size: {{ order.shoeSize }}, Lace Color: {{ order.laceColor }}
        </li>
      </ul>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [],
        error: null,
      };
    },
    async created() {
      try {
        const response = await fetch("https://sneaker-config.onrender.com/api/v1/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        this.orders = await response.json();
      } catch (err) {
        this.error = err.message;
      }
    },
  };
  </script>
  