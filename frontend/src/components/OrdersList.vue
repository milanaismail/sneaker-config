<template>
    <div>
      <h1>All Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Shoe Size</th>
            <th>Lace</th>
            <th>Sole</th>
            <th>Inner Shoe</th>
            <th>Outer Shoe</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.shoeSize }}</td>
            <td>
              {{ order.laceColor }} / {{ order.laceFabric }}
            </td>
            <td>
              {{ order.soleColor }} / {{ order.soleFabric }}
            </td>
            <td>
              {{ order.innerShoeColor }} / {{ order.innerShoeFabric }}
            </td>
            <td>
              {{ order.outerShoeColor }} / {{ order.outerShoeFabric }}
            </td>
            <td>{{ order.status }}</td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td>
              <button @click="viewOrder(order)">View</button>
              <button @click="editStatus(order)">Edit Status</button>
              <button @click="deleteOrder(order.id)">Delete</button>
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
        const response = await fetch("https://sneaker-config.onrender.com/api/v1/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
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
      viewOrder(order) {
        alert(`Viewing details for order: ${order.id}`);
        // Implement modal or navigate to an order details page
      },
      editStatus(order) {
        const newStatus = prompt(`Update status for order ${order.id}:`, order.status);
        if (newStatus) {
          // Send request to update the status
          console.log(`Updating status for ${order.id} to ${newStatus}`);
        }
      },
      deleteOrder(orderId) {
        if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
          // Send request to delete the order
          console.log(`Deleting order ${orderId}`);
        }
      },
    },
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  