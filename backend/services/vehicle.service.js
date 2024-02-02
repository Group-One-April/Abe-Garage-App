// Import the database query function from the database module
const { query } = require("../config/db.config");

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

// Service function to get all vehicles
async function getAllVehicles() {
  const sql = `SELECT * FROM customer_vehicle_info`;

  try {
    const vehicles = await query(sql);
    return vehicles;
  } catch (error) {
    throw error;
  }
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

// Service function to update a vehicle by ID
async function updateVehicleById(vehicleId, updatedData) {
  const sql = `
    UPDATE customer_vehicle_info 
    SET 
      vehicle_year = ?,
      vehicle_make = ?,
      vehicle_model = ?,
      vehicle_type = ?,
      vehicle_mileage = ?,
      vehicle_tag = ?,
      vehicle_serial = ?,
      vehicle_color = ?
    WHERE vehicle_id = ?
  `;

  const params = [
    updatedData.vehicle_year,
    updatedData.vehicle_make,
    updatedData.vehicle_model,
    updatedData.vehicle_type,
    updatedData.vehicle_mileage,
    updatedData.vehicle_tag,
    updatedData.vehicle_serial,
    updatedData.vehicle_color,
    vehicleId,
  ];

  try {
    await query(sql, params);
    return true; // Return true on successful update
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
};
