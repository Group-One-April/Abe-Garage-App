//import services from the service service
const serviceService = require("../services/service.service");

//create the add service controller
async function createService(req, res, next) {
  try {
    const serviceData = req.body;
    //create the service
    const service = await serviceService.createService(serviceData);
    if (!service) {
      res.status(400).json({
        error: "Failed to add the service!",
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
//create a controller to get all services
async function getAllServices(req, res, next) {
  try {
    // Assuming serviceService.getAllServices returns a Promise resolving to a services array
    const services = await serviceService.getAllServices();
    res.status(200).json({
      services: services,
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

//create a controller to get a service by id
async function getServiceById(req, res, next) {
  try {
    const serviceId = req.params.service_id;
    // Assuming serviceService.getServiceById returns a Promise resolving to a service object
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res.status(404).json({
        error: "Service not found",
      });
    }
    res.status(200).json({
      service: service,
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

//create a controller to update a service
async function updateService(req, res, next) {
  try {
    const serviceData = req.body;
    //update the service
    const service = await serviceService.updateService(serviceData);
    if (!service) {
      res.status(400).json({
        error: "Failed to update the service!",
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
  createService,
  getAllServices,
  getServiceById,
  updateService,
};
