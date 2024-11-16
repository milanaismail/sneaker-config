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
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>{{ order.customer?.fullName || "N/A" }}</td>
          <td>{{ order.totalPrice || "N/A" }}</td>
          <td>{{ order.status || "N/A" }}</td>
          <td>
            <button @click="viewOrder(order._id)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
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
      const response = await fetch("https://sneaker-config.onrender.com/api/v1/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      this.orders = await response.json();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    viewOrder(orderId) {
      this.$router.push(`/orders/${orderId}`);
    },
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
