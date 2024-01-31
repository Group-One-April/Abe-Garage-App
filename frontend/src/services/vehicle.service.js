// Import from the env
const api_url = process.env.REACT_APP_API_URL;
// A function to send post request to create a new vehicle
const createVehicle = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};
// Export all the functions
const vehicleService = {
  createVehicle,
};
export default vehicleService;
