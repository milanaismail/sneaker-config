<template>
    <div>
      <h1>Order Details</h1>
      <h2>Product Details</h2>
      <ul v-for="product in order.products" :key="product.productId">
        <li>Product ID: {{ product.productId }}</li>
        <li>Colors: {{ product.colors }}</li>
        <li>Fabrics: {{ product.fabrics }}</li>
        <li>Size: {{ product.size }}</li>
        <li>Price: {{ product.price }}</li>
        <li>Quantity: {{ product.quantity }}</li>
        <li>Total: {{ product.price * product.quantity }}</li>
      </ul>
      <h2>Customer Details</h2>
      <ul>
        <li>Full Name: {{ order.customer.fullName }}</li>
        <li>Email: {{ order.customer.email }}</li>
        <li>Phone: {{ order.customer.phone }}</li>
        <li>Shipping Address: {{ order.customer.shippingAddress }}</li>
        <li>Billing Address: {{ order.customer.billingAddress }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        order: null,
        error: null,
      };
    },
    async created() {
      try {
        const response = await fetch(`https://sneaker-config.onrender.com/api/v1/orders/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch order details");
        this.order = await response.json();
      } catch (err) {
        this.error = err.message;
      }
    },
  };
  </script>
  