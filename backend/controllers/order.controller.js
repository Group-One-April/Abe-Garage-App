const crypto = require('crypto')
const orderService = require("../services/order.service");
const customerService = require("../services/customer.service");
const vehicleService = require("../services/vehicle.service");
const nodeMailer = require('nodemailer')

// a function to create order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    // console.log(orderData);

    //customer by ID
    const customer = await customerService.getCustomerById(
      orderData.customer_id
    );
    if (!customer) {
      return res.status(404).json({
        error: "Customer not found",
      });
    }

    // customer by email
    const customerEmail = customer.customer_email;
    const customerName = `${customer.customer_first_name} ${customer.customer_last_name}`

    const order = await orderService.createOrder(orderData);

    if (!order) {
      return res.status(400).json({
        error: "Order failed to be added",
      });
    }

    // how to set up nodemailer?
    const orderStatusUrl = `http:localhost8000/order-status/${order.order.order_hash}`

    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth:{
        user: 'nuhamintes2016@gmail.com',
        pass: 'thisISthePASS'
      }
    })

    const mailTo = {
      from: 'nuhamintes2016@gmail.com',
      to: customerEmail,
      subject: 'Order created sussessfully!',
      text: `Hello ${customerName},\n\n We\'re pleased to confirm that your order has been successfully processed.\n\nOrder details: n\nYou can view the status of your order here by visiting: ${orderStatusUrl}\n\nBest regards,\n Abe Garage Inc.`,
    }

    await transport.sendMail(mailTo)

    return res.status(200).json({
      status: "true",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

// a function to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    if (!orders) {
      res.status(400).jsom({
        error: "Failed to get all orders",
      });
    } else {
      res.status(200).json({
        status: "true",
        data: orders,
      });
    }
  } catch (error) {
    // console.log(err)
    res.status(400).json({
      error: "Try again, something went wrong.",
    });
  }
};

// a function to get order by id
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);
    if (!order || order.status === 404) {
      res.status(404).json({
        error: "Order not found (by id)",
      });
    } else {
      res.status(500).json({
        status: "true",
        data: order,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// a function to get orders by customers ID
const getOrdersByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.id;
    const orders = await orderService.getOrdersByCustomerId(customerId);
    if (!orders) {
      res.status(400).json({
        error: "Failed to get order by customer Id",
      });
    } else {
      res.status(200).json({
        status: "true",
        data: orders,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// a function to update order
const updateOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = await orderService.updateOrder(orderData);

    if (!order) {
      res.status(400).json({
        error: "order can't be updated",
      });
    } else {
      res.status(200).json({
        status: "true",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// a function to get order by hashed data
const getOrderByHash = async (req, res) => {
  try {
    const orderHash = req.params.hash;
    const order = await orderService.getOrderByHash(orderHash);
    if (!order) {
      res.status(400).json({
        error: "failed to get prder by hashed data",
      });
    }
    const order_id = order.order.order_id;
    const customer_id = order.order.customer_id;
    const vehicle_id = order.order.vehicle_id;

    // order_id
    const orderData = await orderService.getOrderById(order_id);
    if (!orderData) {
      res.status(400).json({
        error: "Failed to get order by orderId",
      });
    }

    //customer_id
    const customerData = await customerService.getOrdersByCustomerId(
      customer_id
    );
    if (!customerData) {
      res.status({
        error: "Failed to get order by customerId",
      });
    }

    // vehicle_id
    const vehicleData = await vehicleService.getVehicleById(vehicle_id);
    if (!vehicleData) {
      res.status(400).json({
        error: "Failed to get order by vehicle",
      });
    }

    res.status(200).json({
      status: "true",
      data: {
        order: orderData.order,
        customer: customerData,
        vehicle: vehicleData,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByHash,
  updateOrder,
  getOrdersByCustomerId,
  getOrderById,
};
