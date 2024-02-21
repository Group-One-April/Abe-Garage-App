// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the employee controller
const employeeController = require('../controllers/employee.controller');
// Import middleware 
// const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add employee request on post
router.post("/api/employee", employeeController.createEmployee);
// [authMiddleware.verifyToken, authMiddleware.isAdmin],
// Create a route to handle the get all employees request on get
router.get("/api/employees",  employeeController.getAllEmployees);

// Create a route to handle the get single  employee request on get
router.get('/api/employee/:id',    employeeController.getSingleEmployee);

// Create a route to handle the update  employee
router.put( '/api/employee', employeeController.updateEmployee);


// Create a route to handle the delete  employee request on get
router.delete("/api/employee",  employeeController.deleteEmployee)

// Export the router 
module.exports = router;