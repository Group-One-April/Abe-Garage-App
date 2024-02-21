import React, { useState } from 'react';
import vehicleService from '../../../../services/vehicle.service';

function AddVehicleForm(props) {
    const [vehicle_year, setVehicleYear] = useState('');
    const [vehicle_make, setVehicleMake] = useState('');
    const [vehicle_model, setVehicleModel] = useState('');
    const [vehicle_type, setVehicleType] = useState('');
    const [vehicle_mileage, setVehicleMileage] = useState('');
    const [vehicle_tag, setVehicleTag] = useState('');
    const [vehicle_serial, setVehicleSerial] = useState('');
    const [vehicle_color, setVehicleColor] = useState('');
    // Errors
    const [vehicleYearRequired, setVehicleYearRequired] = useState('');
    const [vehicleMakeRequired, setVehicleMakeRequired] = useState('');
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const handleSubmit = (e) => {
      // Prevent the default behavior of the form
      e.preventDefault();
      // Handle client side validations
      let valid = true; // Flag
      // Vehicle year is required
      if (!vehicle_year) {
        setVehicleYearRequired("Vehicle year is required");
        valid = false;
      } else {
        setVehicleYearRequired("");
      }
      // Vehicle make is required
      if (!vehicle_make) {
        setVehicleMakeRequired("Vehicle make is required");
        valid = false;
      } else {
        setVehicleMakeRequired("");
      }
      // If the form is not valid, do not submit
      if (!valid) {
        return;
      }
      const formData = {
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
      };
      // Send the data to the server
      const newVehicle = vehicleService.createVehicle(formData);
      newVehicle
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          // If error is returned from the API server, set the error message
          if (data.error) {
            setServerError(data.error);
          } else {
            // Reset the form
            setVehicleYear("");
            setVehicleMake("");
            setVehicleModel("");
            setVehicleType("");
            setVehicleMileage("");
            setVehicleTag("");
            setVehicleSerial("");
            setVehicleColor("");
            // Set the success message
            setSuccess(true);
            setServerError("");
            // Remove the success message after 2 seconds
            setTimeout(() => {
              setSuccess(false);
            }, 2000);
          }
        });
        // Handle Catch errors
        newVehicle.catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
    };
    
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="text"
                        name="vehicle_year"
                        value={vehicle_year}
                        onChange={(event) => setVehicleYear(event.target.value)}
                        placeholder="Vehicle year"
                      />
                      {vehicleYearRequired && (
                        <div className="validation-error" role="alert">
                          {vehicleYearRequired}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_make"
                        value={vehicle_make}
                        onChange={(event) => setVehicleMake(event.target.value)}
                        placeholder="Vehicle make"
                      />
                      {vehicleMakeRequired && (
                        <div className="validation-error" role="alert">
                          {vehicleMakeRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_model"
                        value={vehicle_model}
                        onChange={(event) => setVehicleModel(event.target.value)}
                        placeholder="Vehicle model"
                        required
                      />
                    </div>
                   
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_type"
                        value={vehicle_type}
                        onChange={(event) => setVehicleType(event.target.value)}
                        placeholder="Vehicle type"
                        required
                      />
                    </div>
                    
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_mileage"
                        value={vehicle_mileage}
                        onChange={(event) => setVehicleMileage(event.target.value)}
                        placeholder="Vehicle mileage"
                        required
                      />
                    </div>
                    
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_tag"
                        value={vehicle_tag}
                        onChange={(event) => setVehicleTag(event.target.value)}
                        placeholder="Vehicle tag"
                        required
                      />
                    </div>
                    
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_serial"
                        value={vehicle_serial}
                        onChange={(event) => setVehicleSerial(event.target.value)}
                        placeholder="Vehicle serial"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_color"
                        value={vehicle_color}
                        onChange={(event) => setVehicleColor(event.target.value)}
                        placeholder="Vehicle color"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add vehicle</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddVehicleForm