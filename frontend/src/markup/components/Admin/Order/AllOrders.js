import React, {useState, useEffect} from 'react'
import orderService from '../../../../services/order.service'
import {FaEdit} from 'react-icons/fa'
import {PiArrowSquareOutBold} from 'react-icons/pi'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../Contexts/AuthContext'

const AllOrders = () => {
  // declare states
  const [orders, setOrders] = useState([]);
  const {
    customerId,
    customerInfo,
    vehicle,
    updateCustomerInfo,
    updateVehicle,
  } = useAuth(); //from the AuthContext

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAll();
        setOrders(data.data.orders.sort((a, b) => b.order_id - a.order_id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  const formatCustomerAddedDate = (dateString) => {
    const originalDate = new Date(dateString);

    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  //handle on click event
  const handleClick = (order) => {
    updateCustomerInfo({
      order_id: order.order_id,
      customer_id: order.customer_id,
      customer_first_name: order.customer_first_name,
      customer_last_name: order.customer_last_name,
      customer_email: order.customer_email,
      customer_phone_number: order.customer_phone_number,
      active_customer_status: order.active_customer_status,
    });
    updateVehicle({
      vehicle_id: order.vehicle_id,
      vehicle_make: order.vehicle_make,
      vehicle_model: order.vehicle_model,
      vehicle_color: order.vehicle_color,
      vehicle_year: order.vehicle_year,
      vehicle_tag: order.vehicle_tag,
      vehicle_serial: order.vehicle_serial,
      vehicle_mileage: order.vehicle_mileage,
    });
  };

  return (
    <section className="contact-section">
      <div className=" mx-4">
        <div className="contact-title mb-1">
          <h2>Orders</h2>
        </div>
        <table className="table table-striped table-hover border">
          <thead>
            <tr>
              <th scope="col " className="border">
                Order Id
              </th>
              <th scope="col" className="border">
                Customer
              </th>
              <th scope="col" className="border">
                Vehicle
              </th>

              <th scope="col" className="border">
                Order Date
              </th>
              <th scope="col" className="border">
                Recived By
              </th>
              <th scope="col" className="border">
                Order Status
              </th>
              <th scope="col" className="border">
                View/Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="border">
                  <h6 className="py-0 my-0 mx-3 font-weight-bold">
                    {order.order_id}
                  </h6>
                </td>
                <td className="border p-3">
                  <h5 className="py-0 my-0 font-weight-bold">
                    {order.customer_first_name} {order.customer_last_name}
                  </h5>
                  <h6 className="py-1 my-0 text-muted">
                    {
                      //remove the letters after "gmail" in the email
                      order.customer_email.split("@")[0] + "@..."
                    }
                  </h6>
                  <h6 className="py-0 my-0 text-muted">
                    {order.customer_phone_number}
                  </h6>
                </td>
                <td className="border">
                  <h5 className="py-0 my-0 font-weight-bold">
                    {order.vehicle_make + " " + order.vehicle_model}
                  </h5>
                  <h6 className="py-1 my-0 text-muted">{order.vehicle_year}</h6>
                  <h6 className="py-0 my-0 text-muted">{order.vehicle_tag}</h6>
                </td>
                <td className="border">
                  {formatCustomerAddedDate(order.order_date)}
                </td>
                <td className="border">
                  {order.employee_first_name}{" "}
                  {
                    //the first letter of the last name
                    order.employee_last_name.charAt(0)
                  }
                </td>
                <td className="border py-4">
                  {order.order_status === 0 ? (
                    <h6 className=" text-center rounded-pill bg-warning font-weight-bold">
                      In Progress
                    </h6>
                  ) : order.order_status === 1 ? (
                    <h6 className=" text-white rounded-pill text-center bg-success font-weight-bold">
                      Completed
                    </h6>
                  ) : (
                    <h6 className="rounded-pill text-white m-auto text-center bg-secondary font-weight-bold">
                      Recived
                    </h6>
                  )}
                </td>
                <td className="border">
                  <Link to="/admin/all-orders/order-update">
                    {" "}
                    <FaEdit
                      className="mx-2 scale-on-hover cursor-pointer"
                      onClick={() => handleClick(order)}
                    />
                  </Link>
                  <Link to="/admin/all-orders/order-detail">
                    <PiArrowSquareOutBold
                      className="mx-1 fw-bold scale-on-hover cursor-pointer"
                      onClick={() => handleClick(order)}
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
}

export default AllOrders