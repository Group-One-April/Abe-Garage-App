import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";

import ServicesService from "../../../../services/service.service";
//import services css
import "./Services.css";

const AddNewServiceForm = () => {
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  //errors
  const [serviceNameRequired, setServiceNameRequired] = useState("");
  const [serviceDescriptionRequired, setServiceDescriptionRequired] =
    useState("");
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!service_name) {
      setServiceNameRequired("Service name is required");
      valid = false;
    } else {
      setServiceNameRequired("");
    }
    if (!service_description) {
      setServiceDescriptionRequired("Service description is required");
      valid = false;
    } else {
      setServiceDescriptionRequired("");
    }
    if (valid) {
      const newService = {
        service_name,
        service_description,
      };
      const createdService = ServicesService.createService(newService, token);
      createdService
        .then((res) => {
          if (!res.ok) {
            console.log(res.status);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="contact-title col-md-6">
          <h2>Add New Service</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="service_name">Service Name</label>
              <input
                type="text"
                className="form-control"
                id="service_name"
                value={service_name}
                onChange={(e) => setServiceName(e.target.value)}
              />
              <small className="text-danger">{serviceNameRequired}</small>
            </div>
            <div className="form-group">
              <label htmlFor="service_description">Service Description</label>
              <textarea
                className="form-control"
                id="service_description"
                value={service_description}
                onChange={(e) => setServiceDescription(e.target.value)}
              ></textarea>
              <small className="text-danger">
                {serviceDescriptionRequired}
              </small>
            </div>
            <button type="submit" className="btn btn-primary btn-red">
              Add New Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewServiceForm;
