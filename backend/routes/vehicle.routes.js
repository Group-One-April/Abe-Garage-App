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