<template>
  <div>
    <h1>Orders Overview</h1>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Created</th>
          <th>Customer</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="viewOrder(order.id)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    const response = await fetch("https://sneaker-config.onrender.com/api/v1/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.orders = await response.json();
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    viewOrder(id) {
      this.$router.push(`/orders/${id}`);
    },
  },
};
</script>
