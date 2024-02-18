const express = require("express");
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const auth = require("../middlewares/auth.middleware");

// Create a vehicle
router.post("/api/vehicle", auth, vehicleController.createVehicle);

// Get all vehicles
router.get("/api/vehicle/:vehicle_id", auth, vehicleController.getAllVehicles);

// Get a vehicle by customer ID
router.get(
  "/api/vehicles/:customer_id",
  auth,
  vehicleController.getVehicleByCustomerId
);

// Update a vehicle by ID
router.put("/api/vehicle", auth, vehicleController.updateVehicle);

module.exports = router;
