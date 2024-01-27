//import express from 'express';
const express = require('express');
//call the router method from express to create the router  
const router = express.Router();
//import the customer controller
const customerController = require('../controllers/customer.controller');
//create a route to handle the add customer request on post
router.post("/api/customer", customerController.createCustomer);




//export the router
module.exports = router;