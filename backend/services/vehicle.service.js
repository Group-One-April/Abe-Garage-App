// Import the database query function from the database module
const { query } = require("../config/db.config");

// check if vehicle exists before it's created
async function checkIfVehicleExists(vehicle_serial) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?";
  const rows = await conn.query(query, [vehicle_serial]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// Service function to create a vehicle
async function createVehicle(vehicleData) {
  const sql = `
    INSERT INTO customer_vehicle_info 
    (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    vehicleData.customer_id,
    vehicleData.vehicle_year,
    vehicleData.vehicle_make,
    vehicleData.vehicle_model,
    vehicleData.vehicle_type,
    vehicleData.vehicle_mileage,
    vehicleData.vehicle_tag,
    vehicleData.vehicle_serial,
    vehicleData.vehicle_color,
  ];

  try {
    const result = await query(sql, params);
    return result.insertId; // Return the ID of the newly created vehicle
  } catch (error) {
    throw error;
  }
}

// Service function to get vehicles by customer ID
async function getVehicleByCustomerId(customer_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
  const rows = await conn.query(query, [customer_id]);
  console.log(rows);
  return rows;
}


// Service function to get a vehicle by ID
async function getVehicleById(vehicleId) {
  const sql = `SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?`;

  try {
    const vehicle = await query(sql, [vehicleId]);
    return vehicle[0]; // Assuming vehicle ID is unique
  } catch (error) {
    throw error;
  }
}

// Service function to get vehicle by customer Id

//Service function to update vehicle
async function updateVehicle(customer_vehicle_info) {
  const query =
    "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?";
  const rows = await conn.query(query, [
    customer_vehicle_info.vehicle_year,
    customer_vehicle_info.vehicle_make,
    customer_vehicle_info.vehicle_model,
    customer_vehicle_info.vehicle_type,
    customer_vehicle_info.vehicle_mileage,
    customer_vehicle_info.vehicle_tag,
    customer_vehicle_info.vehicle_serial,
    customer_vehicle_info.vehicle_color,
    customer_vehicle_info.vehicle_id,
  ]);
  console.log(rows);
  return rows.affectedRows === 1;
}

module.exports = {
  checkIfVehicleExists,
  createVehicle,
  getVehicleByCustomerId,
  getVehicleById,
  updateVehicle,
};
