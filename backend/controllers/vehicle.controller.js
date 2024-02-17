

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


