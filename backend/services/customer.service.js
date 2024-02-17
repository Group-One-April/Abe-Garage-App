//import crypto to hash the customer data
const crypto = require("crypto");
//import the database connection
const conn = require("../config/db.config");

// Create the functions if the customer exists and to create the customer
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  return rows.length > 0;
}

//------------ Create the customer----------------//
async function createCustomer(customer) {
  console.log(customer);
  let createdCustomer = {};
  try {
    // Create a SHA-256 hash of the customer data
    const dataToHash = `${customer.customer_email}-${customer.customer_phone_number}`;
    const hashedData = crypto
      .createHash("sha256")
      .update(dataToHash)
      .digest("hex");

    // Insert the email and hash into the customer_identifier table
    const query1 =
      "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
    const rows1 = await conn.query(query1, [
      customer.customer_email,
      customer.customer_phone_number,
      hashedData,
    ]);
    console.log(rows1);

    if (rows1.affectedRows !== 1) {
      return false;
    }

    // Get the customer_id from the first insert
    const customer_id = rows1.insertId;

    // Insert the remaining data into the customer_info table
    const query2 =
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?,?)";
    const rows2 = await conn.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);

    // construct the customer object to return
    createdCustomer = {
      customer_id: customer_id,
      customer_hash: hashedData, // Include the hash in the response
      customer_first_name: customer.customer_first_name,
      customer_last_name: customer.customer_last_name,
      customer_email: customer.customer_email,
      customer_phone_number: customer.customer_phone_number,
      active_customer_status: customer.active_customer_status,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the customer object
  return createdCustomer;
}

//----------create a function to get all customers-----///
async function getAllCustomers() {
  try {
    const query =
      "SELECT * FROM customer_info INNER JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id";
    const rows = await conn.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
//---------------- Create the function to get customer by id-----------------//
async function getCustomerById(id) {
  const query =
    "SELECT * FROM customer_info INNER JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id WHERE customer_info.customer_id = ?";
  const rows = await conn.query(query, [id]);

  if (rows.length === 0) {
    // No customer found with the given ID
    return null;
  }

  // Assuming that the query returns a single customer, you can return the first row
  const customer = rows[0];

  // Optionally, you may want to format the result or exclude unnecessary fields
  const formattedCustomer = {
    customer_id: customer.customer_id,
    customer_first_name: customer.customer_first_name,
    customer_last_name: customer.customer_last_name,
    customer_email: customer.customer_email,
    customer_phone_number: customer.customer_phone_number,
    active_customer_status: customer.active_customer_status,
    customer_hash: customer.customer_hash,
    customer_added_date: customer.customer_added_date,
  };

  return formattedCustomer;
}

//---------- Create the function to update the customer-----------------//
async function updateCustomer(customer) {
    const query1 =
      "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?";
    const query2 =
      "UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?";
  
    try {
      const result1 = await conn.query(query1, [
        customer.customer_first_name,
        customer.customer_last_name,
        customer.active_customer_status,
        customer.customer_id,
      ]);
  
      // Check the result of the first update
      if (result1.affectedRows !== 1) {
        return { success: false, message: "Customer not found or not updated" };
      }
  
      // Add your logic for the second update (query2)
      const result2 = await conn.query(query2, [
        customer.customer_phone_number,
        customer.customer_id,
      ]);
  
      // Check the result of the second update
      if (result2.affectedRows !== 1) {
        return {
          success: false,
          message: "Customer not found or not updated in customer_identifier",
        };
      }
  
      return { success: true, updatedCustomer: customer };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error updating customer" };
    }
  }

// export the functions
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getAllCustomers,
  getCustomerById,
    updateCustomer,
};
