import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderService from "../../../services/order.service";
import serviceService from "../../../services/service.service";

const OrderStatus = () => {
  // get the hash from the url
  const { hash } = useParams();
  // create a variable to store the orders
  const [orders, setOrders] = useState([]);
  // create a variable to store the service ids
  const [serviceIds, setServiceIds] = useState([]);
  // create a variable to store the requested services
  const [requestedServices, setRequestedServices] = useState([]);
  // create a variable to store the merged array
  const [merged, setMerged] = useState([]);
  // create a variable to store the customer info
  const [customerInfo, setCustomerInfo] = useState({});
  // create a variable to store the vehicle info
  const [vehicle, setVehicle] = useState({});

  // Fetch all orders by order_id using async/await

  useEffect(() => {
    //create a function to fetch orders
    const fetchOrders = async () => {
      try {
        // Get the order data by the order hash
        const data = await orderService.getOrderByOrderHash(hash);
        setOrders(data.data.order); //get the order info
        setServiceIds(
          //get the service ids
          data.data.order.order_services.map((service) => service.service_id)
        );
        setCustomerInfo(data.data.customer); //get the customer info
        setVehicle(data.data.vehicle[0]); //get the vehicle info
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  // Fetch all services by service_id using async/await
  useEffect(() => {
    const fetchRequestedServices = async () => {
      try {
        // Fetch services for each service_id in the array
        const servicePromises = serviceIds.map(async (service_id) => {
          return serviceService.getServiceByServiceId(service_id);
        });

        // Wait for all promises to resolve
        const serviceResponses = await Promise.all(servicePromises);

        // Extract services from the responses
        const requestedServices = serviceResponses.map(
          (response) => response.service
        );

        // Flatten the array of services
        const flattenedServices = requestedServices.flat();

        // Set requested services
        setRequestedServices(flattenedServices);
      } catch (err) {
        console.error("Error fetching requested services:", err);
      }
    };
    fetchRequestedServices();
  }, [serviceIds]);

  // Merge the two arrays
  useEffect(() => {
    // Create a function to merge the two arrays
    const merge = () => {
      // Merge the requested services with the order services
      const merged = requestedServices.map((service) => {
        // Find the order service that matches the service
        const orderService = orders.order_services.find(
          (orderService) => orderService.service_id === service.service_id
        );
        // Return the merged object
        return { ...service, ...orderService };
      });
      setMerged(merged);
    };
    merge();
  }, [orders, requestedServices]);

  // Format the date time string
  const formatCustomerAddedDate = (dateString) => {
    const originalDate = new Date(dateString); // Create a new date object
    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    // Return the formatted date string
    return `${day}-${month}-${year} || ${hours}:${minutes}`;
  };

  // Return section
  return (
    <section
      style={{ backgroundColor: "#f6f7fa" }}
      className="contact-section mt-n4"
    >
      <div style={{ maxWidth: 960 }} className="mx-5  m-auto">
        <div className="contact-title mb-1">
          <h2>Order's of {customerInfo.customer_first_name}</h2>
        </div>

        {/* Return the customer and vehicle information */}
        <div className="d-flex w-100">
          <div className="bg-white p-4 mr-2 w-100">
            <div className=" d-flex justify-content-between">
              <h4 className="fw-bold font-weight-bold">
                <span className=" fw-bold mr-2">
                  {customerInfo.customer_first_name}
                </span>
                {customerInfo.customer_last_name}
                <span></span>
              </h4>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Email :</span>
              <span className="text-secondary">
                {customerInfo.customer_email}
              </span>
            </div>
            <div>
              <span className="font-weight-bold mr-2 ">Phone Number:</span>
              <span className="text-secondary">
                {customerInfo.customer_phone_number}
              </span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Active Customer: </span>
              <span className="text-secondary">
                {customerInfo.active_customer_status === 1 ? "Yes" : "No"}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 w-100 ml-2">
            {vehicle && (
              <div>
                <div className="d-flex justify-content-between">
                  <h4 className="fw-bold font-weight-bold">
                    <span className="fw-bold mr-2">{vehicle.vehicle_make}</span>
                    {vehicle.vehicle_model}
                    <span></span>
                  </h4>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">Color :</span>
                  <span className="text-secondary">
                    {vehicle.vehicle_color}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">Tag :</span>
                  <span className="text-secondary">{vehicle.vehicle_tag}</span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">year :</span>
                  <span className="text-secondary">{vehicle.vehicle_year}</span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">
                    Vehicle mileage :
                  </span>
                  <span className="text-secondary">
                    {vehicle.vehicle_mileage}
                  </span>
                </div>

                <div>
                  <span className="font-weight-bold mr-2">Serial :</span>
                  <span className="text-secondary">
                    {vehicle.vehicle_serial}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Return the requested services */}
        <div className="bg-white mt-4 py-3">
          <div className="contact-title mb-n4 mx-4">
            <h2>Requested Services</h2>
          </div>
          <div className="m-4">
            {merged &&
              merged.map((service) => (
                <div
                  className="shadow-sm bg-white my-2 d-flex"
                  key={service._id}
                >
                  <div className="pt-3 pb-1 px-4 col-10">
                    <h5 className="mb-1 font-weight-bold">
                      {service.service_name}
                    </h5>
                    <h6 className=" mb-1 text-secondary">
                      {service.service_description}
                    </h6>
                  </div>
                  <div className="d-flex  align-items-center col-2">
                    {/* //check box to select the service */}
                    {service.service_completed === 0 ? (
                      <h6 className=" w-100 text-center  rounded-pill bg-warning font-weight-bold ">
                        In Progress
                      </h6>
                    ) : (
                      <h6 className=" w-100 text-white rounded-pill text-center bg-success font-weight-bold">
                        Completed
                      </h6>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Return the additional information */}
        <div className=" bg-white px-4 py-4 mt-4 contact-title mb-1">
          <h2 style={{ fontSize: 30 }}>Additional Information</h2>
          {orders.additional_request !== null ? (
            <div className="bg-white p-3 mr-2 w-100 shadow-sm mb-2">
              <h5 className="mb-1 font-weight-bold ">
                {" "}
                Additional Request:{" "}
                <span
                  className="text-secondary"
                  style={{ fontWeight: "normal", fontSize: 15 }}
                >
                  {orders.additional_request}
                </span>
              </h5>
            </div>
          ) : null}
          <div className="bg-white p-3 mr-2 w-100 shadow-sm mb-3">
            <h6 className="mb-1 font-weight-bold">
              Order Date :
              <span
                className="text-secondary"
                style={{ fontWeight: "normal", fontSize: 15 }}
              >
                {formatCustomerAddedDate(orders.order_date)}
              </span>{" "}
            </h6>
            <h6 className="mb-1 font-weight-bold">
              {orders.completion_date === null
                ? "Estimated Completion Date: "
                : "Completed Date : "}
              <span
                className="text-secondary"
                style={{ fontWeight: "normal", fontSize: 15 }}
              >
                {orders.completion_date === null
                  ? formatCustomerAddedDate(orders.estimated_completion_date)
                  : formatCustomerAddedDate(orders.completion_date)}
              </span>{" "}
            </h6>

            <h5 className="mb-4 font-weight-bold">
              Total Price : ${orders.order_total_price}.00
            </h5>
            {orders.order_status === 0 ? (
              <h6 className=" text-center rounded-pill bg-warning font-weight-bold">
                In Progress
              </h6>
            ) : orders.order_status === 1 ? (
              <h6 className=" text-white rounded-pill text-center bg-success font-weight-bold">
                Completed
              </h6>
            ) : (
              <h6 className="rounded-pill text-white m-auto text-center bg-secondary font-weight-bold">
                Recived
              </h6>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
