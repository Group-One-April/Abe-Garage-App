import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "../../../../Contexts/AuthContext";
import serviceService from "../../../../services/service.service";
import orderService from "../../../../services/order.service";

const CreateNewOrderStepThree = () => {
  const [services, setServices] = useState([]);
  const [requestedServices, setRequestedServices] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const { customerId, customerInfo, vehicle } = useAuth(); //from the AuthContext
  const decodedToken = jwtDecode(localStorage.getItem("employee")); //decoding the token

  const employeeId = decodedToken.employee_id; //getting the employee id from the decoded token
  const navigate = useNavigate(); //useNavigate hook

  // useEffect to get all services
  useEffect(() => {
    const getServices = async () => {
      try {
        const services = await serviceService.getAll();
        setServices(services);
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
  }, []);

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
  };

  const order_service = requestedServices.map((id) => ({ service_id: id })); //order_service array

  // Format selectedDateTime to the desired format
  const formattedDate = `${selectedDateTime.getFullYear()}-${(
    selectedDateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedDateTime
    .getDate()
    .toString()
    .padStart(2, "0")} ${selectedDateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${selectedDateTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${selectedDateTime
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  // HandleClick function to create a new order
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const order = {
        customer_id: customerId,
        employee_id: employeeId,
        vehicle_id: vehicle.vehicle_id,
        estimated_completion_date: formattedDate,
        additional_request: additionalRequest,
        order_total_price: totalPrice,
        order_services: order_service,
      };

      const response = await orderService.createNewOrder(order);

      if (
        response.status === 200 ||
        response.status === true ||
        response.status === "true"
      ) {
        //clear the form
        setRequestedServices([]);
        setAdditionalRequest("");
        setTotalPrice("");
        setSelectedDateTime(new Date());
        //redirect to the all orders page
        navigate("/admin/all-orders");
      } else {
        console.log("Order creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="contact-section">
      <div className="mx-5">
        <div className="contact-title mb-1">
          <h2>Create a new order</h2>
        </div>
        <div className="bg-white p-3">
          <div className=" d-flex justify-content-between">
            <h4 className="fw-bold font-weight-bold">
              <span className=" fw-bold mr-2">
                {customerInfo.customer_first_name}
              </span>
              {customerInfo.customer_last_name}
              <span></span>
            </h4>
            <GiCancel className=" mt-2 mr-2 text-danger  font-weight-bold cursor-pointer scale-on-hover" />
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
        <div className="bg-white p-3 mt-3">
          {vehicle && (
            <div>
              <div className="d-flex justify-content-between">
                <h4 className="fw-bold font-weight-bold">
                  <span className="fw-bold mr-2">{vehicle.vehicle_make}</span>
                  {vehicle.vehicle_model}
                  <span></span>
                </h4>
                <GiCancel className="mt-2 mr-2 text-danger font-weight-bold cursor-pointer scale-on-hover" />
              </div>
              <div>
                <span className="font-weight-bold mr-2">Color :</span>
                <span className="text-secondary">{vehicle.vehicle_color}</span>
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
                <span className="font-weight-bold mr-2">Vehicle mileage :</span>
                <span className="text-secondary">
                  {vehicle.vehicle_mileage}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2">Serial :</span>
                <span className="text-secondary">{vehicle.vehicle_serial}</span>
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
        <div className="bg-white mt-4 py-3">
          <div className="contact-title mb-n4 mx-4">
            <h2>Service we provide</h2>
          </div>
          <div className="m-4">
            {services.services &&
              services.services.map((service) => (
                <div
                  className="shadow-sm bg-white my-2 d-flex"
                  key={service._id}
                >
                  <div className="pt-3 pb-1 px-4 flex-grow-1">
                    <h5 className="mb-1 font-weight-bold">
                      {service.service_name}
                    </h5>
                    <h6 className=" mb-1 text-secondary">
                      {service.service_description}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center px-4">
                    {/* //check box to select the service */}
                    <input
                      type="checkbox"
                      style={{ height: "20px", width: "20px" }}
                      //on select add the serviece id to the requested services array
                      onChange={(event) => {
                        if (event.target.checked) {
                          setRequestedServices([
                            ...requestedServices,
                            service.service_id,
                          ]);
                        }
                        //if the service is unchecked remove the service id from the requested services array
                        else {
                          setRequestedServices(
                            requestedServices.filter(
                              (id) => id !== service.service_id
                            )
                          );
                        }
                      }}
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* -------form to add new service---- */}
        <div className=" bg-white px-5 pt-5 mt-4 contact-title mb-1">
          <h2>Additional request</h2>
          <div className="contact-form">
            <form>
              <div className="row clearfix">
                <div className="form-group col-md-12">
                  <textarea
                    type="text"
                    name="service_description"
                    value={additionalRequest}
                    onChange={(event) =>
                      setAdditionalRequest(event.target.value)
                    }
                    placeholder="Service description"
                    required
                  />
                </div>
                <div className="form-group col-md-12 d-flex">
                  {/* {serverError && (
                      <div className="validation-error" role="alert">
                        {serverError}
                      </div>
                    )} */}
                  <input
                    className="w-75"
                    type="text"
                    name="service_name"
                    value={totalPrice}
                    onChange={(event) => setTotalPrice(event.target.value)}
                    placeholder="Price"
                    required
                  />
                  <DatePicker
                    selected={selectedDateTime}
                    onChange={handleDateTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    dateFormat="MMMM d, yyyy HH:mm"
                    timeIntervals={30} // Set timeIntervals to 1 to include seconds
                    style={{ width: "300px" }}
                  />
                </div>

                <div className="form-group col-md-12">
                  <button
                    onClick={handleClick}
                    className="theme-btn btn-style-one"
                    type="submit"
                    data-loading-text="Please wait..."
                  >
                    <span>SUBMIT ORDER</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateNewOrderStepThree;
