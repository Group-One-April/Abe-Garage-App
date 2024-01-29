//import express from 'express';
const express = require("express");
//call the router method from express to create the router
const router = express.Router();
//import the service controller
const serviceController = require("../controllers/service.controller");
//import the auth middleware
const auth = require("../middlewares/auth.middleware");
//create a route to handle the add service request on post
router.post("/api/service", serviceController.createService);
//create a route to handle the get all services request on get
router.get("/api/services", serviceController.getAllServices);

//create a route to handle the get service by id request on get
router.get("/api/service/:service_id", serviceController.getServiceById);

//create a route to handle the update service request on put
router.put("/api/service", serviceController.updateService);

//export the router
module.exports = router;
