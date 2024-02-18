const apiUrl = process.env.REACT_APP_API_URL;

// Service function to create new order
const createNewOrder = async (order) => {
  try {
    const response = await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Service function to get all orders
const getAll = async () => {
  try {
    const headers = new Headers();

    // Get the employee token from localStorage
    const tokenObject = JSON.parse(localStorage.getItem("employee"));

    if (!tokenObject || !tokenObject.employee_token) {
      throw new Error("Employee token not found in headers");
    }

    const token = tokenObject.employee_token;

    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    // Send a GET request to the API to retrieve all orders
    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Service function to get order by customer ID
const getOrderByCustomerId = async (customerId) => {
  try {
    const headers = new Headers();

    // Get the employee token from localStorage
    const tokenObject = JSON.parse(localStorage.getItem("employee"));

    if (!tokenObject || !tokenObject.employee_token) {
      throw new Error("Employee token not found in headers");
    }

    const token = tokenObject.employee_token;

    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    // Send a GET request to the API to retrieve orders for a specific customer
    const response = await fetch(
      `${apiUrl}/api/customer/orders/${customerId}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Service function to get order by ID
const getOrderByOrderId = async (orderId) => {
  try {
    const headers = new Headers();

    // Get the employee token from localStorage
    const tokenObject = JSON.parse(localStorage.getItem("employee"));

    if (!tokenObject || !tokenObject.employee_token) {
      throw new Error("Employee token not found in headers");
    }

    const token = tokenObject.employee_token;

    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    // Add any other headers if needed

    // Send a GET request to the API to retrieve orders for a specific customer
    const response = await fetch(`${apiUrl}/api/order/${orderId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Service function to update an order
const updateOrder = async (order) => {
  try {
    console.log(order, "order");
    const response = await fetch(`${apiUrl}/api/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    console.log(response, "response");

    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data, "data");

    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Service function to get order by hashed data
const getOrderByOrderHash = async (hash) => {
  try {
    // Send a GET request to the API to retrieve orders for a specific customer
    const response = await fetch(`${apiUrl}/order-status/${hash}`, {
      method: "GET",
      // headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Export the functions
const modules = {
  getAll,
  createNewOrder,
  getOrderByCustomerId,
  getOrderByOrderId,
  updateOrder,
  getOrderByOrderHash,
};
export default modules;
