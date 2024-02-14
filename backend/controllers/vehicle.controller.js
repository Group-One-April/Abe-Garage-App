//import the vehicle service
const vehicleService = require("../services/vehicle.service");
//create the add vehicle controller
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
          error: "Failed to add the vehicle!",
        });
      } else {
        res.status(200).json({
          status: "trueeeeeeeee",
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
//write a function to get single vehicle using vehicle id
async function getVehicleById(req, res, next) {
  try {
    const vehicleId = req.params.vehicle_id;
    // Assuming vehicleService.getVehicleById returns a Promise resolving to a vehicle object
    const vehicle = await vehicleService.getVehicleById(vehicleId);
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

//write a function to get vehicle by customer id
async function getVehicleByCustomerId(req, res, next) {
  try {
    const customerId = req.params.customer_id;
    // Assuming vehicleService.getVehicleByCustomerId returns a Promise resolving to a vehicle object
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
//write a function to update a vehicle
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
//export the controller functions
module.exports = {
  createVehicle,
  getVehicleById,
  getVehicleByCustomerId,
  updateVehicle,
};
