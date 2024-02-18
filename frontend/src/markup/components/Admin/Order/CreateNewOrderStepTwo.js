import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import VehicleService from "../../../../services/vehicle.service";
import CustomerService from "../../../../services/customer.service";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaHandPointer } from "react-icons/fa";

const CreateNewOrderStepTwo = () => {
  const {
    customerId,
    updateCustomerId,
    customerInfo,
    updateCustomerInfo,
    vehicle,
    updateVehicle,
  } = useAuth();

  //vehicle state
  const [vehiclesData, setVehiclesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create useEffect function to fetch the customer data using the customerId
  useEffect(() => {
    // Check if customerId exists before making the API call
    if (!customerId) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await CustomerService.getSingleCustomer(customerId);

        if (res && res.customer) {
          updateCustomerInfo(res.customer);
        } else {
          console.error("Invalid response format:", res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async fetchData function
  }, [customerId]);

  // Create a useEffect function to fetch the vehicle data using customerId
  useEffect(() => {
    // Check if customerId exists
    if (!customerId) {
      return;
    }
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const res = await VehicleService.getVehicle(customerId);
        if (res && res.vehicle) {
          setVehiclesData(res.vehicle);
        } else {
          console.error("Invalid response format:", res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle(); // Call the async fetchData function
  }, [customerId]);

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
              <FaEdit className="text-danger cursor-pointer scale-on-hover" />
            </span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="m-5 p-4 bg-white">
        <div>
          <h4 className="font-weight-bold mt-2 mb-3">Choose a Vehicle</h4>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col ">Year</th>
              <th scope="col">Make</th>
              <th scope="col">Model</th>

              <th scope="col">Tag</th>
              <th scope="col">Serial</th>
              <th scope="col">Color</th>
              <th scope="col">Mileage</th>
              <th scope="col">Choose</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesData.map((vehicleData) => (
              <tr key={vehicleData.vehicle_id}>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_year}
                </td>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_make}
                </td>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_model}
                </td>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_tag}
                </td>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_serial}
                </td>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_color}
                </td>
                <td className=" fw-bold text-secondary">
                  {vehicleData.vehicle_mileage}
                </td>

                <td className="">
                  <Link to="/admin/order/add-new-order/Select-service">
                    {" "}
                    <FaHandPointer
                      //update the customer id state variable
                      onClick={() => updateVehicle(vehicleData)}
                      className="mx-2 scale-on-hover cursor-pointer"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CreateNewOrderStepTwo;
