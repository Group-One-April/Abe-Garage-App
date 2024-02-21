import React from "react";
import CreateNewOrderStepTwo from "../../../components/Admin/Order/CreateNewOrderStepTwo";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

const CreateNewOrdersStepTwoPage = () => {
  return (
    <div>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <CreateNewOrderStepTwo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewOrdersStepTwoPage;
