import React from "react";
import CreateNewOrderStepThree from "../../../components/Admin/Order/CreateNewOrderStepThree";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
// import { useAuth } from '../../../../Contexts/AuthContext'

const CreateNewOrderThreePage = () => {
  // State declared and to access the state variables from the auth context
  // const {
  //   customerId,
  //   updateCustomerId,
  //   customerInfo,
  //   updateCustomerInfo,
  //   vehicle,
  //   updateVehicle,
  // } = useAuth();
  return (
    <div>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <CreateNewOrderStepThree />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewOrderThreePage;
