// // Import the express module
// const express = require('express');
// //call the router method from express to create the router
// const router = express.Router();
// //import the vehicle controller
// const vehicleController = require('../controllers/vehicle.controller');
// //import middleware
// const authMiddleware = require("../middlewares/auth.middleware");
// //create a route to handle the add vehicle request on post
// router.post("/api/vehicle", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.createVehicle);
// //create a route to handle the get all vehicles request on get
// router.get("/api/vehicles", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.getAllVehicles);
// //create a route to handle the get vehicle by id request on get
// router.get("/api/vehicle/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.getVehicleById);
// //create a route to handle the update vehicle by id request on put
// router.put("/api/vehicle/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.updateVehicleById);
// //export the router
// module.exports = router;

const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");

// Create a vehicle
router.post("/", vehicleController.createVehicle);

// Get all vehicles
router.get("/", vehicleController.getAllVehicles);

// Get a vehicle by ID
router.get("/:id", vehicleController.getVehicleById);

// Update a vehicle by ID
router.put("/:id", vehicleController.updateVehicleById);

// Get a vehicle by customer ID
router.get("/customer/:id", vehicleController.getVehicleByCustomerId);

module.exports = router;
