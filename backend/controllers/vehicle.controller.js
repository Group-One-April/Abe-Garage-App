const vehicleService = require("../services/vehicle.service");

// Controller function to handle creating a vehicle
async function createVehicle(req, res, next) {
  //check if vehicle serial already exists in the database
  const vehicleExists = await vehicleService.checkIfVehicleExists(
    req.body.vehicle_serial
  );
  //if vehicle exists, send a response to the client
  if (vehicleExists) {
    res.status(400).json({
      error: "This vehicle serial is already associated with another vehicle!",
    });
  } else {
    try {
      const vehicleData = req.body;
      //create the vehicle
      const vehicle = await vehicleService.createVehicle(vehicleData);
      if (!vehicle) {
        res.status(400).json({
          error: "Failed to add vehicle!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// Controller function to handle getting vehiclesby customer ID
async function getVehicleByCustomerId(req, res, next) {
  try {
    const customerId = req.params.customer_id;
   
    const vehicle = await vehicleService.getVehicleByCustomerId(customerId);
    if (!vehicle) {
      return res.status(404).json({
        error: "Vehicle not found",
      });
    }
    res.status(200).json({
      vehicle: vehicle,
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}


// Controller function to handle getting a vehicle by ID
async function getVehicleById(req, res) {
  try {
    const vehicleId = req.params.id;
    
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

// controller function fpr updating vehicle
async function updateVehicle(req, res, next) {
  try {
    const vehicleData = req.body;
    //update the vehicle
    const vehicle = await vehicleService.updateVehicle(vehicleData);
    if (!vehicle) {
      res.status(400).json({
        error: "Failed to update the vehicle!",
      });
    } else {
      res.status(200).json({
        status: "true",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createVehicle,
  getVehicleByCustomerId,
  getVehicleById,
  updateVehicle,
};


