import React, { useState, useEffect } from "react";
import customerService from "../../../../services/customer.service";
import { FaEdit } from "react-icons/fa";
import { PiArrowSquareOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
//import useAuth hook
import { useAuth } from "../../../../Contexts/AuthContext";

export default function Customers() {
  //use the useAuth hook to access the all the state variables from the AuthContext
  const { customerId, updateCustomerId, customerInfo, updateCustomerInfo, vehicle, updateVehicle } = useAuth();

  //define the state variables and their setter functions
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedDates, setFormattedDates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [renderedCustomers, setRenderedCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await customerService.getAll();

        if (res && res.customers) {
          setCustomers(res.customers);
          const formattedDatesObject = {};
          res.customers.forEach((customer) => {
            formattedDatesObject[customer.customer_id] =
              formatCustomerAddedDate(customer.customer_added_date);
          });
          setFormattedDates(formattedDatesObject);
          setRenderedCustomers(res.customers.slice(0, 10)); // Initial rendering
        } else {
          console.error("Invalid response format:", res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-search whenever the search term changes
  useEffect(() => {
    // Filter customers based on the search term whenever it changes
    const filteredCustomers = customers.filter((customers) => {
      const {
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone_number,
      } = customers;
      const searchRegex = new RegExp(searchTerm, "i");

      return (
        searchRegex.test(customer_first_name) ||
        searchRegex.test(customer_last_name) ||
        searchRegex.test(customer_email) ||
        searchRegex.test(customer_phone_number)
      );
    });

    setRenderedCustomers(filteredCustomers.slice(0, 10)); // Update rendered customers
  }, [searchTerm, customers]);

  // Format the date-----------
  const formatCustomerAddedDate = (dateString) => {
    const originalDate = new Date(dateString);

    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year} `;
  };

  //handle pagination
  const handlePagination = (direction) => {
    if (direction === "first") {
      setRenderedCustomers(customers.slice(0, 10));
      setCurrentPage(1);
    } else if (direction === "previous") {
      const startIndex = Math.max((currentPage - 2) * 10, 0);
      setRenderedCustomers(customers.slice(startIndex, startIndex + 10));
      setCurrentPage(currentPage - 1);
    } else if (direction === "next") {
      const startIndex = currentPage * 10;
      if (startIndex < customers.length) {
        setRenderedCustomers(customers.slice(startIndex, startIndex + 10));
        setCurrentPage(currentPage + 1);
      }
    } else if (direction === "last") {
      const startIndex = Math.floor((customers.length - 1) / 10) * 10;
      setRenderedCustomers(customers.slice(startIndex, startIndex + 10));
      setCurrentPage(Math.ceil(customers.length / 10));
    }
  };

  //update the customer id state variable
  const updateCustomerIdState = (newCustomerId) => {
    updateCustomerId(newCustomerId);
  };

  return (
    <section className="contact-section">
      <div className="mx-5 ">
        <div className="contact-title mb-1">
          <h2>Customers</h2>
        </div>
        <div>
          <div className="">
            <input
              placeholder="Search a customer using first name, last name, email or phone number"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-100 py-2 px-3 border border-black rounded-0"
            />
          </div>
          <div className="mt-4">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col " className="border">
                    ID
                  </th>
                  <th scope="col" className="border">
                    First Name
                  </th>
                  <th scope="col" className="border">
                    Last Name
                  </th>

                  <th scope="col" className="border">
                    Email
                  </th>
                  <th scope="col" className="border">
                    Phone Number
                  </th>
                  <th scope="col" className="border">
                    Added Date
                  </th>
                  <th scope="col" className="border">
                    Active
                  </th>
                  <th scope="col" className="border">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderedCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td
                      className="border fw-bold"
                      style={{ fontWeight: "bold", color: "#222b48" }}
                    >
                      {customer.customer_id}
                    </td>
                    <td
                      className="border"
                      style={{ fontWeight: "bold", color: "#222b48" }}
                    >
                      {customer.customer_first_name}
                    </td>
                    <td
                      className="border"
                      style={{ fontWeight: "bold", color: "#222b48" }}
                    >
                      {customer.customer_last_name}
                    </td>
                    <td className="border">{
                    //cut the email after "."
                    customer.customer_email.substring(0, customer.customer_email.indexOf("."))
                    
                    }</td>
                    <td className="border">{customer.customer_phone_number}</td>
                    <td className="border">
                      {formattedDates[customer.customer_id]}
                    </td>
                    <td className="border">
                      {customer.active_customer_status === 1 ? "Yes" : "No"}
                    </td>
                    <td className="border">
                      <Link to="/admin/customer/update">
                        {" "}
                        <FaEdit
                          //update the customer id state variable
                          onClick={() =>
                            updateCustomerIdState(customer.customer_id)
                          }
                          className="mx-2 scale-on-hover cursor-pointer"
                        />
                      </Link>
                      <Link to="/admin/customer/profile">
                        <PiArrowSquareOutBold
                        // update customer info state variable and customerid state variable
                        // update vehicle state variable
                          onClick={() => {
                            updateCustomerInfo(customer);
                            updateCustomerIdState(customer.customer_id);
                          }}
                     
                         className="mx-1 fw-bold scale-on-hover cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn border border-black rounded-0 px-5 py-1"
              onClick={() => handlePagination("first")}
            >
              First
            </button>
            <button
              className="btn border border-black rounded-0 px-5 py-1"
              onClick={() => handlePagination("previous")}
            >
              Previous
            </button>
            <button
              className="btn border border-black rounded-0 px-5 py-1"
              onClick={() => handlePagination("next")}
              style={{ backgroundColor: `rgb(8, 19, 54)`, color: `white` }}
            >
              Next
            </button>
            <button
              className="btn border border-black rounded-0 px-5 py-1"
              onClick={() => handlePagination("last")}
              style={{ backgroundColor: `rgb(8, 19, 54)`, color: `white` }}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
