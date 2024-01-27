//import customer service
const customerService = require('../services/customer.service');

//--------create the add customer controller--------//
async function createCustomer(req, res, next) {
   // Check if employee email already exists in the database
    const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);
    // If employee exists, send a response to the client
    if (customerExists) {
        res.status(400).json({
            error: "This email address is already associated with another customer!"
        });
    } else {
        try {
            const customerData = req.body;
            // Create the employee
            const customer = await customerService.createCustomer(customerData);
            if (!customer) {
                res.status(400).json({
                    error: "Failed to add the customer!"
                });
            } else {
                res.status(200).json({
                    status: "true",
                    customer: customer
                });
            }
        } catch (error) {
            console.log(err);
            res.status(400).json({
                error: "Something went wrong!"
            });
        }
    }
}

// export the controller
module.exports = {
    createCustomer
};

//Test