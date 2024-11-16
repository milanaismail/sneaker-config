<template>
    <div>
      <h1>Order Details</h1>
      <h2>Product Details</h2>
      <ul>
        <li>Product ID: {{ order.id }}</li>
        <li>Colors and Fabrics: {{ order.colors }}</li>
        <li>Size: {{ order.size }}</li>
        <li>Price: {{ order.price }}</li>
        <li>Quantity: {{ order.quantity }}</li>
        <li>Total: {{ order.totalPrice }}</li>
      </ul>
      <h2>Customer Details</h2>
      <ul>
        <li>Full Name: {{ order.customer.name }}</li>
        <li>Email: {{ order.customer.email }}</li>
        <li>Number: {{ order.customer.phone }}</li>
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
      };
    },
    async created() {
      const orderId = this.$route.params.id;
      const token = localStorage.getItem("token");
      const response = await fetch(`https://sneaker-config.onrender.com/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.order = await response.json();
    },
  };
  </script>
  