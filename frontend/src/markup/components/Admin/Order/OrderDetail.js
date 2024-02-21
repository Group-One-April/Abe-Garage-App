import React, {useState, useEffect} from 'react'
import { useAuth } from '../../../../Contexts/AuthContext'
import orderService from '../../../../services/order.service'
import serviceService from '../../../../services/service.service'
import {Link, useNavigate} from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'


const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [serviceIds, setServiceIds] = useState([]);
  const [requestedServices, setRequestedServices] = useState([]);
  const [merged, setMerged] = useState([]);
  const { customerId, customerInfo, vehicle } = useAuth(); //from the AuthContext
//   const navigate = useNavigate(); //useNavigate hook

  // fetch by order id
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const order_id = customerInfo.order_id;
        const data = await orderService.getOrderByOrderId(order_id);
        setOrders(data.data);
        setServiceIds(
          data.data.order_services.map((service) => service.service_id)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  // fetch by service id
  useEffect(() => {
    const fetchRequestedServices = async () => {
      try {
        // Set loading state
        // setLoading(true);

        // Fetch services for each service_id in the array
        const servicePromises = serviceIds.map(async (service_id) => {
          return serviceService.getServiceByServiceId(service_id);
        });
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

  // Merging the two arrays
  useEffect(() => {
    const merge = () => {
      const merged = requestedServices.map((service) => {
        const orderService = orders.order_services.find(
          (orderService) => orderService.service_id === service.service_id
        );
        return { ...service, ...orderService };
      });
      setMerged(merged);
    };
    merge();
  }, [orders, requestedServices]);

  // Formatting the date
  const formatCustomerAddedDate = (dateString) => {
    const originalDate = new Date(dateString);

    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year} || ${hours}:${minutes}`;
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
        {/* ----- */}
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

}

export default OrderDetail