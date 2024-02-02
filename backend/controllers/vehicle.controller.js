// // Import the vehicle service
// const vehicleService = require('../services/vehicle.service');
// // Create the add vehicle controller
// async function createVehicle(req, res, next) {
//   try {
//     const vehicleData = req.body;
//     // Create the vehicle
//     const vehicle = await vehicleService.createVehicle(vehicleData);
//     if (!vehicle) {
//       res.status(400).json({
//         error: "Failed to add the vehicle!"
//       });
//     } else {
//       res.status(200).json({
//         status: "true",
//       });
//     }
//   } catch (error) {
//     console.log(err);
//     res.status(400).json({
//       error: "Something went wrong!"
//     });
//   }
// }
// // Create the getAllVehicles controller
// async function getAllVehicles(req, res, next) {
//   // Call the getAllVehicles method from the vehicle service
//   const vehicles = await vehicleService.getAllVehicles();
//   // console.log(vehicles);
//   if (!vehicles) {
//     res.status(400).json({
//       error: "Failed to get all vehicles!"
//     });
//   } else {
//     res.status(200).json({
//       status: "success",
//       data: vehicles,
//     });
//   }
// }
// // Create the getVehicleById controller
// async function getVehicleById(req, res, next) {
//   // Call the getVehicleById method from the vehicle service
//   const vehicle = await vehicleService.getVehicleById(req.params.id);
//   // console.log(vehicle);
//   if (!vehicle) {
//     res.status(400).json({
//       error: "Failed to get vehicle by id!"
//     });
//   } else {
//     res.status(200).json({
//       status: "success",
//       data: vehicle,
//     });
//   }
// }
// // Create the updateVehicleById controller
// async function updateVehicleById(req, res, next) {
//   try {
//     const vehicleData = req.body;
//     // Update the vehicle
//     const vehicle = await vehicleService.updateVehicleById(req.params.id, vehicleData);
//     if (!vehicle) {
//       res.status(400).json({
//         error: "Failed to update the vehicle!"
//       });
//     } else {
//       res.status(200).json({
//         status: "true",
//       });
//     }
//   } catch (error) {
//     console.log(err);
//     res.status(400).json({
//       error: "Something went wrong!"
//     });
//   }
// }
// // Create the getVehicleByCustomerId controller
// async function getVehicleByCustomerId(req, res, next) {
//   // Call the getVehicleByCustomerId method from the vehicle service
//   const vehicle = await vehicleService.getVehicleByCustomerId(req.params.id);
//   // console.log(vehicle);
//   if (!vehicle) {
//     res.status(400).json({
//       error: "Failed to get vehicle by customer id!"
//     });
//   } else {
//     res.status(200).json({
//       status: "success",
//       data: vehicle,
//     });
//   }
// }
// // Export the createVehicle controller
// module.exports = {
//   createVehicle,
//   getAllVehicles,
//   getVehicleById,
//   updateVehicleById,
//   getVehicleByCustomerId
// };


const vehicleService = require("../services/vehicle.service");

// Controller function to handle creating a vehicle
async function createVehicle(req, res) {
  try {
    const newVehicleId = await vehicleService.createVehicle(req.body);
    res
      .status(201)
      .json({ id: newVehicleId, message: "Vehicle created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to handle getting all vehicles
async function getAllVehicles(req, res) {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to handle getting a vehicle by ID
async function getVehicleById(req, res) {
  const vehicleId = req.params.id;

  try {
    const vehicle = await vehicleService.getVehicleById(vehicleId);
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found" });
    } else {
      res.status(200).json(vehicle);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to handle updating a vehicle by ID
async function updateVehicleById(req, res) {
  const vehicleId = req.params.id;

  try {
    const updated = await vehicleService.updateVehicleById(vehicleId, req.body);
    if (!updated) {
      res.status(404).json({ error: "Vehicle not found" });
    } else {
      res.status(200).json({ message: "Vehicle updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
};
