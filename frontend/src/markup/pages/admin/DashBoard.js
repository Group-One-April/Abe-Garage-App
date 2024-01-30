import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import AdminDashbord from '../../components/Admin/AdminDashbord/AdminDashbord';

function DashBoard() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <AdminDashbord />
        </div>
      </div>
    </div>
  );
}

export default DashBoard