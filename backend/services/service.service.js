//import the query functions from the db.config.js file
const conn = require("../config/db.config");
//create ab async function to create a new service in the database
async function createService(common_services) {
  let createdService = {};
  try {
    //insert the service data into the service table
    const query =
      "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
    const rows = await conn.query(query, [
      common_services.service_name,
      common_services.service_description,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    //get the service id from the insert
    const service_id = rows.insertId;
    //construct the service object to return
    createdService = {
      service_id: service_id,
    };
  } catch (err) {
    console.log(err);
  }
  return createdService;
}

//create an async function to get all services from the database
async function getAllServices() {
  let services = [];
  try {
    //select all services from the database
    const query = "SELECT * FROM common_services";
    const rows = await conn.query(query);
    console.log(rows);
    //construct the services array to return
    services = rows;
  } catch (err) {
    console.log(err);
  }
  return services;
}
//create an async function to get a service by id from the database
async function getServiceById(service_id) {
  let service = {};
  try {
    //select the service from the database
    const query = "SELECT * FROM common_services WHERE service_id = ?";
    const rows = await conn.query(query, [service_id]);
    console.log(rows);
    if (rows.length === 0) {
      return null;
    }
    //construct the service object to return
    service = rows;
  } catch (err) {
    console.log(err);
  }
  return service;
}

//create an async function to update a service in the database
async function updateService(service) {
  let updatedService = {};
  try {
    //update the service in the database
    const query =
      "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";
    const rows = await conn.query(query, [
      service.service_name,
      service.service_description,
      service.service_id,
    ]);
    // console.log(rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    //construct the service object to return
    updatedService = rows;
  } catch (err) {
    console.log(err);
  }
  return updatedService;
}

//module exports
module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
};
