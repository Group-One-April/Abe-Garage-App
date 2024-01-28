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
    // -------------------------console.log(hashedData);

    // the first query is to insert the order into the orders table
    const orderQuery1 =
      "INSERT INTO orders (order_id, customer_id, vehicle_id, employee_id, order_date, order_status, order_hash) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const rows1 = await conn.query(orderQuery1, [
      null,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.employee_id,
      orderData.order_date,
      orderData.order_status,
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
  } catch (err) {
    console.log("creating order failed");
  }
};
