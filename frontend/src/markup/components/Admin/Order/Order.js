import React, { useState, useEffect } from "react";
import CustomerService from "../../../../services/customer.service";

import { FaHandPointer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

const Order = () => {
  //use the useAuth hook to access the customer id state variable
  const { customerId, updateCustomerId } = useAuth();

  //initialize state values
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renderedCustomers, setRenderedCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //create a function to get all customers from the backend usind async/await when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await CustomerService.getAll();

        if (res && res.customers) {
          setCustomers(res.customers);
          //   setRenderedCustomers(res.customers.slice(0, 10)); // Initial rendering
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
  }, [searchTerm]);

  //update the customer id state variable
  const updateCustomerIdState = (newCustomerId) => {
    updateCustomerId(newCustomerId);
  };
  
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title mb-1">
          <h2>Create a new order</h2>
        </div>
        <div>
          <div className="">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search a customer using first name, last name, email or phone number"
              className="w-100 py-2 px-3 border border-black rounded-0"
            />
          </div>
        </div>
        <div className="form-group mt-4">
          {renderedCustomers.length === 0 || searchTerm === "" ? (
            <button
              className="theme-btn btn-style-one"
              type="submit"
              data-loading-text="Please wait..."
            >
              <span>Add new request</span>
            </button>
          ) : (
            <div className="table-responsive border mt-n4 p-3">
              <table className="table table-bordered ">
                <tbody className="">
                  {renderedCustomers.map((customer) => (
                    <tr
                      key={customer.customer_id}
                      style={{
                        backgroundColor:
                          customer.customer_id % 2 === 0 ? "#e9eaed" : "",
                      }}
                    >
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        <Link to="/admin/order/add-new-order">
                          <FaHandPointer
                            className="cursor-pointer scale-on-hover"
                            onClick={() => {
                              updateCustomerIdState(customer.customer_id);
                            }}
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
