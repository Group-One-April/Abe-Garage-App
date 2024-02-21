//import customer service
const customerService = require("../services/customer.service");

//--------create the add customer controller--------//
async function createCustomer(req, res, next) {
  // console.log("hello world")
  // Check if employee email already exists in the database
  const customerExists = await customerService.checkIfCustomerExists(
    req.body.customer_email
  );
  // If employee exists, send a response to the client
  if (customerExists) {
    res.status(400).json({
      error: "This email address is already associated with another customer!",
    });
  } else {
    try {
      const customerData = req.body;
      // Create the employee
      const customer = await customerService.createCustomer(customerData);
      if (!customer) {
        res.status(400).json({
          error: "Failed to add the customer!",
        });
      } else {
        res.status(200).json({
          status: "true",
          customer: customer,
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

//----------create a function to get all customers-------//
async function getAllCustomers(req, res, next) {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({
      customers: customers,
    });
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

//-----------------write a function to get customer by id----------------//
async function getCustomerById(req, res, next) {
  try {
    console.log("hello world")
    const customerId = req.params.id;

    // Assuming customerService.getCustomerById returns a Promise resolving to a customer object
    const customer = await customerService.getCustomerById(customerId);

    if (!customer) {
      return res.status(404).json({
        error: "Customer not found",
      });
    }

    res.status(200).json({
      customer: customer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

//--------write a function to update a customer--------//
async function updateCustomer(req, res, next) {
  try {
    const customerData = req.body;
    const customer = await customerService.updateCustomer(customerData);
    if (!customer) {
      res.status(400).json({
        error: "Failed to update the customer!",
      });
    } else {
      res.status(200).json({
        status: "true",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// export the controller
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};
