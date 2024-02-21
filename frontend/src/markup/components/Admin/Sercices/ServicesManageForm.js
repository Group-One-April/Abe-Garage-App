import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useAuth } from "../../../../Contexts/AuthContext";

import ServicesService from "../../../../services/service.service";

const ServicesManageForm = () => {
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }
  useEffect(() => {
    const allServices = ServicesService.getAllServices(token);
    allServices
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to access this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (
          data.services &&
          Array.isArray(data.services) &&
          data.services.length !== 0
        ) {
          setServices(data.services);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //new useEffect to set the services state with the data
  useEffect(() => {
    console.log(services);
  }, [services]);
  console.log(services);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <h2>Sorry</h2>
                  <p>{apiErrorMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <h1>Services We Provide</h1>
          <div className="container">
            {services.map((service, index) => (
              <div key={service.service_id} className="row">
                <div className="col-md-9">
                  <h2>{service.service_name}</h2>
                  <p>{service.service_description}</p>
                </div>

                <div className="col-md-3">
                  <FaEdit
                    onClick={() =>
                      ServicesService.updateService(
                        service.service_id,
                        {
                          service_name: "New Name",
                          service_description: "New Description",
                        },
                        token
                      )
                    }
                  />
                  <MdDelete
                    onClick={() =>
                      ServicesService.deleteService(service.service_id, token)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default ServicesManageForm;

// const ServicesManageForm = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetch("/api/services")
//       .then((response) => response.json())
//       .then((data) => setServices(data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   const editService = (id, newService) => {
//     fetch(`/api/services/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newService),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setServices(
//           services.map((service) =>
//             service.service_id === id ? data : service
//           )
//         );
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const deleteService = (id) => {
//     fetch(`/api/services/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setServices(services.filter((service) => service.service_id !== id));
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div>
//       {services.map((service) => (
//         <div key={service.service_id}>
//           <h2>{service.service_name}</h2>
//           <p>{service.service_description}</p>
//           <button
//             onClick={() =>
//               editService(service.service_id, {
//                 service_name: "New Name",
//                 service_description: "New Description",
//               })
//             }
//           >
//             Edit
//           </button>
//           <button onClick={() => deleteService(service.service_id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default ServicesManageForm;
