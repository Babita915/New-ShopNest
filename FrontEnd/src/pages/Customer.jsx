import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ============================
  // GET CUSTOMERS
  // ============================
  const getCustomers = async () => {
    try {
      setLoading(true);

     const token = localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5000/api/v1/customers",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      console.log("Customers:", res.data);

      setCustomers(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  // ============================
  // DELETE CUSTOMER
  // ============================
  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("token");
        await axios.delete(
  `http://localhost:5000/api/v1/customers/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Customer deleted successfully");

      getCustomers();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  // ============================
  // EDIT CUSTOMER
  // ============================
  const editCustomer = (id) => {
    navigate(`/editcustomer/${id}`);
  };

  // ============================
  // STATISTICS
  // ============================
  const totalCustomers = customers.length;

  const totalAdmins = customers.filter(
    (customer) => customer.role === "admin"
  ).length;

  const totalUsers = customers.filter(
    (customer) => customer.role === "user"
  ).length;

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(JSON.parse(localStorage.getItem("user")))
console.log(user);
console.log(user?.role);
console.log(user?.role === "admin");
const isAdmin = user?.role?.toLowerCase() === "admin";

  return (
    <div className="bg-light min-vh-100 py-4">

      <div className="container-fluid px-3 px-md-4">
        {/* ============================
            HEADER
        ============================ */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">

            <div className="row align-items-center">

              <div className="col-md-8">

                <div className="d-flex align-items-center">

                  <div
                    className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center me-3 shadow-sm"
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "25px"
                    }}
                  >
                    👥
                  </div>


                  <div>
                    <h2 className="fw-bold mb-1">
                      Customers
                    </h2>

                    <p className="text-muted mb-0">
                      Manage customers and their information
                    </p>
                  </div>

                </div>

              </div>

               <div className="col-md-4 mt-3 mt-md-0 text-md-end">
  <button 
    className="btn btn-primary px-4 shadow-sm" 
    onClick={() => navigate("/addcustomer")} 
  > 
    <span className="me-2">+</span> 
    Add Customer 
  </button> 
</div>

              <div className="col-md-4 mt-3 mt-md-0 text-md-end">

                {isAdmin && (
  <button
    className="btn btn-primary px-4 py-2 shadow-sm"
    onClick={() => navigate("/addcustomer")}
  >
    <span className="me-2">+</span>
    Add Customer
  </button>
)}

              </div>

            </div>

          </div>
        </div>


        {/* ============================
            STATISTICS
        ============================ */}
        <div className="row g-3 mb-4">

          {/* Total Customers */}
          <div className="col-sm-6 col-lg-4">

            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Customers
                    </p>

                    <h3 className="fw-bold mb-0">
                      {totalCustomers}
                    </h3>

                    <small className="text-success">
                      Active customers
                    </small>

                  </div>

                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      fontSize: "27px"
                    }}
                  >
                    👥
                  </div>

                </div>

              </div>
            </div>

          </div>


          {/* Admin */}
          <div className="col-sm-6 col-lg-4">

            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Administrators
                    </p>

                    <h3 className="fw-bold mb-0">
                      {totalAdmins}
                    </h3>

                    <small className="text-danger">
                      Admin accounts
                    </small>

                  </div>

                  <div
                    className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      fontSize: "27px"
                    }}
                  >
                    🛡️
                  </div>

                </div>

              </div>
            </div>

          </div>


          {/* Users */}
          <div className="col-sm-6 col-lg-4">

            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Normal Users
                    </p>

                    <h3 className="fw-bold mb-0">
                      {totalUsers}
                    </h3>

                    <small className="text-success">
                      Registered users
                    </small>

                  </div>

                  <div
                    className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      fontSize: "27px"
                    }}
                  >
                    👤
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>


        {/* ============================
            CUSTOMER TABLE
        ============================ */}
        <div className="card border-0 shadow-sm">

          <div className="card-body p-0">

            {/* TABLE HEADER */}
            <div className="p-4 border-bottom">

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">

                <div>

                  <h5 className="fw-bold mb-1">
                    Customer List
                  </h5>

                  <small className="text-muted">
                    View and manage all registered customers
                  </small>

                </div>

                <span className="badge bg-primary rounded-pill px-3 py-2">
                  {customers.length} Customers
                </span>

              </div>

            </div>


            {/* LOADING */}
            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary mb-3"
                  style={{
                    width: "3rem",
                    height: "3rem"
                  }}
                  role="status"
                >
                </div>

                <h6 className="fw-semibold">
                  Loading customers...
                </h6>

                <p className="text-muted mb-0">
                  Please wait while we fetch customer data.
                </p>

              </div>

            ) : customers.length === 0 ? (

              /* ============================
                 EMPTY STATE
              ============================ */

              <div className="text-center py-5 px-3">

                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "35px"
                  }}
                >
                  👥
                </div>

                <h5 className="fw-bold">
                  No Customers Found
                </h5>

                <p className="text-muted">
                  There are no customers in your database yet.
                </p>

                <button
                  className="btn btn-primary px-4"
                  onClick={() =>
                    navigate("/addcustomer")
                  }
                >
                  + Add First Customer
                </button>

              </div>

            ) : (

              /* ============================
                 TABLE
              ============================ */

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-dark">

                    <tr>

                      <th className="px-4 py-3">
                        ID
                      </th>

                      <th className="py-3">
                        Customer
                      </th>

                      <th className="py-3">
                        Email
                      </th>

                      <th className="py-3">
                        Phone
                      </th>

                      <th className="py-3">
                        City
                      </th>

                      <th className="py-3">
                        Role
                      </th>

                      <th className="text-center py-3">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {customers.map((customer) => (

                      <tr key={customer.id}>

                        {/* ID */}
                        <td className="px-4">

                          <span className="badge bg-secondary rounded-pill">
                            #{customer.id}
                          </span>

                        </td>


                        {/* CUSTOMER */}
                        <td>

                          <div className="d-flex align-items-center">

                            <div
                              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold"
                              style={{
                                width: "42px",
                                height: "42px"
                              }}
                            >
                              {customer.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>

                              <div className="fw-semibold">
                                {customer.name}
                              </div>

                              <small className="text-muted">
                                Customer ID #{customer.id}
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* EMAIL */}
                        <td>

                          <span className="text-dark">
                            {customer.email}
                          </span>

                        </td>


                        {/* PHONE */}
                        <td>

                          <span className="text-muted">
                            {customer.phone || "N/A"}
                          </span>

                        </td>


                        {/* CITY */}
                        <td>

                          <span className="badge bg-light text-dark border">
                            📍 {customer.city || "N/A"}
                          </span>

                        </td>


                        {/* ROLE */}
                        <td>

                          {customer.role === "admin" ? (

                            <span className="badge bg-danger rounded-pill px-3">
                              🛡️ Admin
                            </span>

                          ) : (

                            <span className="badge bg-success rounded-pill px-3">
                              👤 User
                            </span>

                          )}

                        </td>


                        {/* ACTIONS */}
                        <td className="text-center">

  {isAdmin ? (
    <div className="d-flex justify-content-center gap-2">

      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => editCustomer(customer.id)}
      >
        ✏️
      </button>

      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteCustomer(customer.id)}
      >
        🗑️
      </button>

    </div>
  ) : (
    <span className="badge bg-secondary">
      View Only
    </span>
  )}

</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}