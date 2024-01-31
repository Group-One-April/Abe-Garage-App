// // Import the query function from the db.config.js file
// const conn = require("../config/db.config");
// // Import the bcrypt module
// const bcrypt = require('bcrypt');

// // A function to check if vehicle exists in the database
// async function checkIfVehicleExists(vehicle_vin) {
//     const query = "SELECT * FROM vehicle WHERE vehicle_vin = ? ";
//     const rows = await conn.query(query, [vehicle_vin]);
//     console.log(rows);
//     if (rows.length > 0) {
//         return true;
//     }
//     return false;
// }
// // A function to create a new vehicle
// async function createVehicle(vehicle) {
//     let createdVehicle = {};
//     try {
//         // Insert the vehicle data in to the vehicle table
//         const query = "INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year, vehicle_color, vehicle_vin, vehicle_license_plate, vehicle_insurance_provider, vehicle_insurance_policy_number, vehicle_insurance_expiration_date, vehicle_registration_expiration_date, vehicle_registration_state, vehicle_active_status)  VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
//     } catch (err) {
//         console.log(err);
//     }
//     // Return the vehicle object
//     return createdVehicle;
// }

// // A function to get all vehicles
// async function getAllVehicles() {
//     const query = "SELECT * FROM vehicle";
//     const rows = await conn.query(query);
//     return rows;
// }   
// // A function to get vehicle by id
// async function getVehicleById(vehicle_id) {
//     const query = "SELECT * FROM vehicle WHERE vehicle_id = ?";
//     const rows = await conn.query(query, [vehicle_id]);
//     return rows;
// }
// // A function to update vehicle by id
// async function updateVehicleById(vehicle_id, vehicle) {
//     let updatedVehicle = {};
//     try {
//         // Update the vehicle data in to the vehicle table
//         const query = "UPDATE vehicle SET vehicle_make = ?, vehicle_model = ?, vehicle_year = ?, vehicle_color = ?, vehicle_vin = ?, vehicle_license_plate = ?, vehicle_insurance_provider = ?, vehicle_insurance_policy_number = ?, vehicle_insurance_expiration_date = ?, vehicle_registration_expiration_date = ?, vehicle_registration_state = ?, vehicle_active_status = ? WHERE vehicle_id = ?";
//         const rows = await conn.query(query, [vehicle_id]);
//         console.log(rows);
//         if (rows.affectedRows !== 1) {
//             return false;
//         }
//         // construct to the vehicle object to return
//         updatedVehicle = {
//             vehicle_id: vehicle_id
//         }
//     } catch (err) {
//         console.log(err);
//     }
//     // Return the vehicle object
//     return updatedVehicle;
// }
// // Export the functions for use in the controller
// module.exports = {
//     checkIfVehicleExists,
//     createVehicle,
//     getAllVehicles,
//     getVehicleById,
//     updateVehicleById
// };


