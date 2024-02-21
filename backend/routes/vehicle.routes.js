//import express from 'express';
const express = require("express");
//call the router method from express to create the router
const router = express.Router();
//import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");



//create a route to handle the add vehicle request on post
router.post("/api/vehicle", vehicleController.createVehicle);
//create a route to handle the get all vehicles request on get
router.get("/api/vehicle/:vehicle_id", vehicleController.getVehicleById);
//create a route to handle the vehicle request by customer id on get
router.get(
  "/api/vehicles/:customer_id",
  vehicleController.getVehicleByCustomerId
);
//create a route to handle the update vehicle request on put
router.put("/api/vehicle", vehicleController.updateVehicle);

//export the router
module.exports = router;
