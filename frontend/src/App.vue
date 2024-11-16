<template>
    <div id="app">
      <h1>Welcome to Sneaker Config</h1>
      <Orders />
    </div>
  </template>
  
  <script>
  import Orders from "./components/OrdersOverview.vue";
  
  export default {
    components: {
      Orders,
    },
  };
  </script>
  