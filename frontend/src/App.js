// Import react
import React from "react";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";

// Import the page components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import AddVehicle from "./markup/pages/admin/AddVehicle";
import Unauthorized from "./markup/pages/Unauthorized";
// Import the Orders and Customers components
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";

// Import the Employees component
import Employees from "./markup/pages/admin/Employees";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file
import "./assets/styles/custom.css";

// Import components
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import About from "./markup/pages/About";
import Contact from "./markup/pages/Contact";
import Services from "./markup/pages/Services";
import DashBoard from "./markup/pages/admin/DashBoard";

// Order Pages Route
import OrderStatusPage from "./markup/pages/admin/OrderStatusPage";
import CreateOrderStepOnePage from "./markup/pages/admin/Order/CreateNewOrderStepOne";
import CreateOrderStepTwoPage from "./markup/pages/admin/Order/CreateNewOrdersStepTwoPage";
import CreateOrderStepThree from "./markup/pages/admin/Order/CreateNewOrderThreePage";
import AllOrdersPage from "./markup/pages/admin/Order/AllOrdersPage";
import OrderDetailPage from "./markup/pages/admin/Order/OrderDetailPage";
import OrderUpdatePage from "./markup/pages/admin/Order/OrderUpdatePage";
import ServicesManage from "./markup/pages/admin/ServicesManage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Routes */}

        <Route path="/admin" element={<DashBoard />} />

        {/* // Add the Customers Route  */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/add-customer" element={<AddCustomer />} />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Vehicles Route  */}
        <Route path="/admin/customer/{customerId}" element={<AddVehicle />} />
        {/* 
          Customers (/admin/customers) - managers and admins
          Orders (/admin/orders) - Can be accessed by all employees
          Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}

        <Route path="/admin/services" element={<ServicesManage />} />

        {/*  Add the Orders Route  */}

        <Route path="/admin/orders" element={<Orders />} />

        <Route path="/order-status/:hash" element={<OrderStatusPage />} />
        <Route
          path="/admin/order/get-customer"
          element={<CreateOrderStepOnePage />}
        />

        <Route
          path="/admin/order/add-new-order"
          element={<CreateOrderStepTwoPage />}
        />

        <Route
          path="/admin/order/add-new-order/Select-Service"
          element={<CreateOrderStepThree />}
        />

        <Route path="/admin/all-orders" element={<AllOrdersPage />} />

        <Route
          path="/admin/all-orders/order-detail"
          element={<OrderDetailPage />}
        />

        <Route
          path="/admin/all-orders/order-update"
          element={<OrderUpdatePage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
