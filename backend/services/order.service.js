// import db from "../config/db.config.js";
const conn = require("../config/db.config.js");

// import crypto from "crypto";
const crypto = require("crypto");

// create async function to add a new order
const createOrder = async (orderData) => {

  try {
    // --------ask about this-------------- generate unique hash for order by customer, vehicle, and employee
    const dataToHash = `${orderData.customer_id}-${orderData.vehicle_id}-${orderData.employee_id}`;
    const hashedData = crypto
      .createHash("md5")
      .update(dataToHash)
      .digest("hex");
    
      // console.log(hashedData);

    // the first query is to insert the order into the orders table
    const orderQuery1 =
      "INSERT INTO orders (order_id, customer_id, vehicle_id, employee_id, order_date, active_order, order_hash) VALUES (?, ?, ?, ?, ?, ?, ?)";
      console.log(orderQuery1);
    const rows1 = await conn.query(orderQuery1, [
      null,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.employee_id,
      orderData.order_date,
      orderData.active_order,
      hashedData,
    ]);

    // check if the order was created
    if (rows1.affectedRows !== 1) {
      console.error("Error adding order");
      return { status: 500, message: "Internal Server Error" };
    }

    // the second query is to insert the order into the order_info table
    const orderQuery2 =
      "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_customer) VALUES (?, ?, ?, ?, ?, ?)";
    const rows2 = await conn.query(orderQuery2, [
      rows2.insertId,
      orderData.order_total_price || null,
      orderData.estimated_completion_date || null,
      orderData.completion_date || null,
      orderData.additional_request || null,
      orderData.notes_for_customer || null,
    ]);

    // check if the order was created and goes to order_info table
    if (rows2.affectedRows !== 1) {
      console.error("Failed to add order to order_info table");
      return { status: 500, message: "Internal Server Error" };
    }

    // Insert additional order information into the order services table
    const query3 =
      "INSERT INTO order_services (order_id, service_id, service_completed	) VALUES ( ?, ?, ?)";

    // Iterate through each service in the 'order_services' array and insert it
    for (const service of orderData.order_services) {
      const rows3 = await conn.query(query3, [
        rows1.insertId, // Use the ID from the first insertion (orders table)
        service.service_id,
        service.service_completed || 0,
      ]);

      // Check if the 'order_services' insertion was successful for each service
      if (rows3.affectedRows !== 1) {
        console.error("Failed to insert order_services into the database.");
        // Consider rolling back the first query if necessary
        return { status: 500, message: "Internal Server Error" };
      }
    }

    //-----------------insert into order_status table---------------//
    const query4 =
      "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";

    const rows4 = await conn.query(query4, [
      rows1.insertId, // Use the ID from the first insertion (orders table)
      orderData.order_completed || 0,
    ]);

    // Check if the 'order_status' insertion was successful
    if (rows4.affectedRows !== 1) {
      console.error("Failed to insert order_status into the database.");
      // Consider rolling back the first query if necessary
      return { status: 500, message: "Internal Server Error" };
    }
    //----------------- Create an object with the details of the created order-------------//
    const createdOrder = {
      id: rows1.insertId,
      customer_id: orderData.customer_id,
      vehicle_id: orderData.vehicle_id,
      employee_id: orderData.employee_id,
      order_hash: hash,
      //   active_order: orderData.order_completed || 0,
      order_total_price: orderData.order_total_price || null,
      estimated_completion_date: orderData.estimated_completion_date || null,
      completion_date: orderData.completion_date || null,
      additional_request: orderData.additional_request || null,
      order_services: orderData.order_services,
    };

    // console.log("Order created successfully:", createdOrder);
    // Return the created order
    return {
      status: 200,
      message: "Order created successfully",
      order: createdOrder,
    };
  } 
  catch (err) {
    console.error("Error creating order:", err);
    return {status: 500, message: "Internal Server Error"}
  }

};

// a function to get all orders wth additional information
const getAllOrders = async () => {
  try {
    // Query the database for all orders with order_info
    const query = `
    SELECT * 
    FROM orders 
    INNER JOIN order_info ON orders.order_id = order_info.order_id
    INNER JOIN customer_info ON orders.customer_id = customer_info.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id INNER JOIN employee_info ON orders.employee_id = employee_info.employee_id INNER JOIN customer_identifier ON orders.customer_id = customer_identifier.customer_id INNER JOIN order_status ON orders.order_id = order_status.order_id`;

    const orders = await conn.query(query);

    // console.log("All Orders:", orders)

    // Check if any orders were found
    if (orders.length === 0) {
      console.error("No orders found.");
      return { status: 404, message: "No orders found", orders: [] };
    }

    // Get additional information about order services
    const ordersWithServices = await Promise.all(
      orders.map(async (order) => {
        const query2 =
          "SELECT service_id, service_completed FROM order_services WHERE order_id = ?";
        const orderServices = await conn.query(query2, [order.order_id]);
        return { ...order, order_services: orderServices };
      })
    );

    console.log("All Orders with Services:", ordersWithServices);
    // Return the orders with additional information
    return { status: 200, message: "Orders found", orders: ordersWithServices };
  } catch (err) {
    console.error("Error getting orders:", err);
    return { status: 500, message: "Internal Server Error" };
  }
};


// a function to get a single order by ID
const getOrderById = async (id) => {
  try {
    // Query the database for the order with the given ID
    const query =
      "SELECT * FROM orders " +
      "INNER JOIN order_info ON orders.order_id = order_info.order_id " +
      "INNER JOIN order_status ON orders.order_id = order_status.order_id " +
      "WHERE orders.order_id = ?";
    const orders = await conn.query(query, [id]);

    console.log("Order:", orders);

    // Check if the order was found
    if (orders.length === 0) {
      console.error("Order not found.");
      return { status: 404, message: "Order not found", order: {} };
    }

    // Get additional information about order services
    const query2 =
      "SELECT service_id, service_completed FROM order_services WHERE order_id = ?";
    const orderServices = await conn.query(query2, [id]);

    // Create an object with the details of the order
    const order = {
      ...orders[0],
      order_services: orderServices,
    };

    console.log("Order:", order);
    // Return the order with additional information
    return { status: 200, message: "Order found", order: order };
  } catch (err) {
    console.error("Error getting order:", err);
    return { status: 500, message: "Internal Server Error" };
  }
};


// a function to get order by customer ID
const getOrdersByCustomerId = async (id) => {
  try {
    // Query the database for all orders with order_info
    const query = `
        SELECT *
        FROM orders
        INNER JOIN order_info ON orders.order_id = order_info.order_id
        INNER JOIN employee_info ON orders.employee_id = employee_info.employee_id
       INNER JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id INNER JOIN order_status ON orders.order_id = order_status.order_id WHERE orders.customer_id = ?`;

    const orders = await conn.query(query, [id]);
    // Check if any orders were found
    if (orders.length === 0) {
      console.error("No orders found.");
      return { status: 404, message: "No orders found", orders: [] };
    }
    //return the orders
    return { status: 200, message: "Orders found", orders: orders };
  } catch (err) {
    console.error("Error getting orders:", err);
    return { status: 500, message: "Internal Server Error" };
  }
};

// a function to update order
const updateOrder = async (orderData) =>{
  try{
    const order_id = orderData.order_id
    console.log("one");
    if(
      orderData.order_completed === undefined ||
      orderData.estimated_completion_date === undefined ||
      orderData.order_id === undefined
      ) {
        console.error("Some parameters are undefined.");
      return { status: 400, message: "Bad Request" };
      }

      console.log("two");
      console.log("two");
    // Update additional order information in the 'order_info' table
    const query2 =
      "UPDATE order_info SET estimated_completion_date = ?, completion_date = ?, additional_request = ?, order_total_price = ?, notes_for_customer = ? WHERE order_id = ?";
    const rows2 = await conn.query(query2, [
      orderData.estimated_completion_date,
      orderData.completion_date,
      orderData.additional_request,
      orderData.order_total_price,
      orderData.notes_for_customer || null,
      orderData.order_id,
    ]);

    //order info update successful
     if (rows2.affectedRows !== 1) {
      console.error("Failed to update order_info.");
      // Consider rolling back the first query if necessary
      return { status: 500, message: "Internal Server Error" };
    }

    // Check if 'order_services' array is present
    if (!orderData.order_services || !Array.isArray(orderData.order_services)) {
      console.error("order_services array is missing or not an array.");
      return { status: 400, message: "Bad Request" };
    }
    console.log("three");
    // Delete existing entries for the specified order_id
    const deleteQuery = "DELETE FROM order_services WHERE order_id = ?";
    await conn.query(deleteQuery, [order_id]);

    for (const service of orderData.order_services) {
      const insertQuery =
        "INSERT INTO order_services (order_id, service_id,service_completed	) VALUES (?,?, ?)";
      await conn.query(insertQuery, [
        order_id,
        service.service_id,
        service.service_completed || 0,
      ]);
    }

    // ------
    // insert into order_status table
    console.log(orderData.order_completed, orderData.order_id);
    const query4 =
      "UPDATE order_status SET order_status = ? WHERE order_id = ?";

    const rows4 = await conn.query(query4, [
      orderData.order_completed,
      orderData.order_id, // Use the ID from the first insertion (orders table)
    ]);
    if (rows4.affectedRows !== 1) {
      console.error("Failed to update order_status.");
      // Consider rolling back the first query if necessary
      return { status: 500, message: "Internal Server Error" };
    }

    console.log("Order updated successfully.");
    // Return success message
    return { status: 200, message: "Order updated successfully" };
  } catch{
    console.error("Error updating order:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// a function to get order by hashed data
const getOrderByHash = async (hash) => {
  // Query the database for the order with the given hash
  try {
    const query = "SELECT * FROM orders WHERE order_hash = ?";
    // Get the order_id by the hash
    const order = await conn.query(query, [hash]);
    if (order.length === 0) {
      console.error("Order not found.");
      return { status: 404, message: "Order not found" };
    }
    // Return the order_id
    return { status: 200, message: "Order found", order: order[0] };
  } catch (error) {
    //return error message
    return { status: 500, message: "Internal Server Error" };
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrder,
  getOrdersByCustomerId,
  getOrderByHash
}
