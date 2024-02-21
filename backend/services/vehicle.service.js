//import the query functions from the database
const conn = require("../config/db.config");
//create a service function that  check if the vehicle exists in the database, if not exist write a function that create new car to the database using      POST /api/vehicle
async function checkIfVehicleExists(vehicle_serial) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?";
  const rows = await conn.query(query, [vehicle_serial]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
//create a service function that  check if the vehicle exists in the database, if doesn't exist write a function that create the vehicle in the database
async function createVehicle(customer_vehicle_info) {
  let createdVehicle = {};
  try {
    // Insert the vehicle data into the customer_vehicle_info table
    const query =
      "INSERT INTO customer_vehicle_info(vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const rows = await conn.query(query, [
      customer_vehicle_info.vehicle_year,
      customer_vehicle_info.vehicle_make,
      customer_vehicle_info.vehicle_model,
      customer_vehicle_info.vehicle_type,
      customer_vehicle_info.vehicle_mileage,
      customer_vehicle_info.vehicle_tag,
      customer_vehicle_info.vehicle_serial,
      customer_vehicle_info.vehicle_color,
      customer_vehicle_info.customer_id,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the vehicle_id from the first insert
    const vehicle_id = rows.insertId;
    // construct the vehicle object to return
    createdVehicle = {
      vehicle_id: vehicle_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the vehicle object
  return createdVehicle;
}

//create function that  check if the vehicle exists in the database, if exist write a function that get a single vehicle by id in the database using GET /api/vehicle/:id
async function getVehicleById(vehicle_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
  const rows = await conn.query(query, [vehicle_id]);
  console.log(rows);
  return rows;
}

//create a service function that  check if the vehicle exists in the database, if exist write a function that GET vehicles by customer ID the database using GET /api/vehicles/:customer_id
async function getVehicleByCustomerId(customer_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
  const rows = await conn.query(query, [customer_id]);
  console.log(rows);
  return rows;
}

//create a service function that  check if the vehicle exists in the database, if exist write a function that update the vehicle in the database
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

//export the functions to use in the controller
module.exports = {
  checkIfVehicleExists,
  createVehicle,
  getVehicleById,
  getVehicleByCustomerId,
  updateVehicle,
};
