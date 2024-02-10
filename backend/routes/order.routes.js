const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

// route to add order - post request
router.post("/api/order", orderController.createOrder);

// route to get all orders - get request
router.get("/api/orders", orderController.getAllOrders);

// route to get order by ID - get request
router.get("/api/order/:id", orderController.getOrderById);

// route to update order - put request
router.put("/api/order", orderController.updateOrder);

//route to get order using customer ID - get request
router.get("/api/customer/orders/:id", orderController.getOrderByCustomerId);

//route to get order by hashed data - get request
router.get("/order-status/:hash", orderController.getOrderByHash);

module.exports = router;
