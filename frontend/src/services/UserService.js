export default {
    async getOrders() {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
  
      return await response.json();
    },
  };
  