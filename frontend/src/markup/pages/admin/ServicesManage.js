import React from "react";
// import CustomerList from "../../components/Admin/customer/CustomerList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useAuth } from "../../../Contexts/AuthContext";
import ServicesManageForm from "../../components/Admin/Sercices/ServicesManageForm";
import AddNewServiceForm from "../../components/Admin/Sercices/AddNewServiceForm";

const ServicesManage = () => {
  //destructure the auth hook
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    // if (isAdmin) {
    return (
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <ServicesManageForm />
              <AddNewServiceForm />
            </div>
          </div>
        </div>
      </div>
    );
    // } else {
    //   return (
    //     <div>
    //       <h1>You are not authorized to access this page</h1>
    //     </div>
    //   );
    // }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
};

export default ServicesManage;
