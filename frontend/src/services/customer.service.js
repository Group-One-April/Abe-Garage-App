// Import from the env
const api_url = process.env.REACT_APP_API_URL;
// A function to send post request to create a new customer
const createCustomer = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};
// Function to send a GET request to retrieve all customers
const getAllCustomers = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};
// Function to send a GET request to retrieve a single customer by customerId
const getCustomerById = async (customerId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/customer/${customerId}`,
    requestOptions
  );
  return response;
};
// Function to send a PUT request to update a customer by customerId
const updateCustomerById = async (customerId, formData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/customer/${customerId}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
};
export default customerService;
