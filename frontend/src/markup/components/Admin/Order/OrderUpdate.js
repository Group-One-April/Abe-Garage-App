import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { useAuth } from '../../../../Contexts/AuthContext'
import orderService from '../../../../services/order.service'
import serviceService from '../../../../services/service.service'

const OrderUpdate = () => {
    const [orders, setOrders] = useState([]);
    const [serviceIds, setServiceIds] = useState([]);
    const [requestedServices, setRequestedServices] = useState([]);
    const { customerInfo, vehicle } = useAuth(); //from the AuthContext
    const [order_status, setOrder_status] = useState(0);
    const [order_completed, setOrder_completed] = useState(0); //order_status is the same as order_completed
    const [updatedOrders, setUpdatedOrders] = useState({});
    const [updater, setUpdater] = useState(false);

    // useEffect to fetch order by orderId
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const order_id = customerInfo.order_id;
          const data = await orderService.getOrderByOrderId(order_id);
          setOrders(data.data);
          setServiceIds(
            data.data.order_services.map((service) => service.service_id)
          );
          setOrder_completed(data.data.order_status);
        } catch (err) {
          console.log(err);
        }
      };
      fetchOrders();
    }, [updater]);

    // useEffect to fetch services by serviceId
    useEffect(() => {
      const fetchRequestedServices = async () => {
        try {
          const servicePromises = serviceIds.map(async (service_id) => {
            return serviceService.getServiceByServiceId(service_id);
          });

          const serviceResponses = await Promise.all(servicePromises); // Wait for all promises to resolve

          // Extract services from the responses
          const requestedServices = serviceResponses.map(
            (response) => response.service
          );
          const flattenedServices = requestedServices.flat(); // Flatten the array of services
          setRequestedServices(flattenedServices); // Set requested services
        } catch (err) {
          console.error("Error fetching requested services:", err);
        }
      };
      fetchRequestedServices();
    }, [serviceIds]);

    // Merge the two arrays
    useEffect(() => {
      const mergeServices = () => {
        const updatedOrder = { ...orders };

        updatedOrder.order_services = requestedServices.map((service) => {
          const existingService = orders.order_services.find(
            (orderService) => orderService.service_id === service.service_id
          );

          return existingService
            ? {
                ...existingService,
                ...service,
                service_completed: existingService.service_completed || 0,
              }
            : { ...service, service_completed: 0 }; // Assuming the service is not completed by default
        });

        setUpdatedOrders(updatedOrder);
      };

      mergeServices();
    }, [orders, requestedServices]);

    // updating order status
    useEffect(() => {
      const updateOrderStatus = () => {
        if (updatedOrders && updatedOrders.order_status !== order_status) {
          setOrders((prevOrders) => ({
            ...prevOrders,
            order_status: order_status,
          }));
        }
      };
      updateOrderStatus();
    }, [order_status, orders]);

    // a function to handle service completed event 
    const handleServiceCompletedChange = (serviceId) => (e) => {
        setUpdatedOrders((prevOrders) => {
          const updatedOrderServices = prevOrders.order_services.map(
            (service) => {
              return service.service_id === serviceId
                ? { ...service, service_completed: e.target.checked ? 1 : 0 }
                : service;
            }
          );

          return {
            ...prevOrders,
            order_services: updatedOrderServices,
          };
        });
    }

    // a function to handle status change event
    const handleOrderStatusChangeAndSubmit = async () => {
      try {
        const newKey = "order_completed";
        const { order_status, ...rest } = updatedOrders;
        const updatedObject = { [newKey]: order_status, ...rest };
        updatedObject.estimated_completion_date = null;

        if (updatedObject && updatedObject[newKey] === 0) {
          // Update "order_completed" to 1 if its current value is 0
          updatedObject[newKey] = 1;

          // Pass updatedObject to the function
          const data = await orderService.updateOrder(updatedObject);

          console.log(data);
          setUpdater(!updater);
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <section className="contact-section">
      <div className="mx-5">
        <div className="contact-title mb-1">
          <h2>Order's of {customerInfo.customer_first_name}</h2>
        </div>
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
            <div>
              <span className="font-weight-bold mr-2">Edit customer info </span>
              <span>
                <Link to="/admin/customer/update">
                  <FaEdit className="text-danger cursor-pointer scale-on-hover" />
                </Link>
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
                <div>
                  <span className="font-weight-bold mr-2">
                    Edit vehicle info{" "}
                  </span>
                  <span>
                    <Link to="/admin/customer/update">
                      <FaEdit className="text-danger cursor-pointer scale-on-hover" />
                    </Link>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ---- */}
        <div className="bg-white mt-4 py-3">
          <div className="contact-title mb-n4 mx-4">
            <h2>Update Status</h2>
          </div>
          <div className="m-4">
            {updatedOrders.order_services &&
              updatedOrders.order_services.map((service) => (
                <div
                  className="shadow-sm bg-white my-2 d-flex"
                  key={service.service_id}
                >
                  <div className="pt-3 pb-1 px-4 col-10">
                    <h5 className="mb-1 font-weight-bold">
                      {service.service_name}
                    </h5>
                    <h6 className=" mb-1 text-secondary">
                      {service.service_description}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center col-2">
                    {order_completed === 1 &&
                    service.service_completed === 1 ? (
                      <div>
                        <h6 className="text-white rounded-pill text-center bg-success font-weight-bold px-2">
                          Completed
                        </h6>
                      </div>
                    ) : (
                      <input
                        style={{ width: "50px", height: "20px" }}
                        className="px-3 mx-2 font-weight-bold"
                        type="checkbox"
                        name={`service_completed_${service.service_id}`}
                        checked={service.service_completed === 1}
                        onChange={handleServiceCompletedChange(
                          service.service_id
                        )}
                      />
                    )}
                  </div>
                </div>
              ))}
            <button
              style={{
                backgroundColor: order_completed === 1 ? "green" : "yellow",
                color: order_completed === 1 ? "white" : "black",
              }}
              className="w-100 btn  mt-3 border-0 font-weight-bold"
              onClick={handleOrderStatusChangeAndSubmit}
            >
              {order_completed === 1 ? "Completed" : "Pending"}
            </button>
          </div>
        </div>
        {/* ----- */}
      </div>
    </section>
  );
}

export default OrderUpdate