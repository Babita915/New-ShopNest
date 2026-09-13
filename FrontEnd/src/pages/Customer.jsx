import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/customer.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ============================
  // CURRENT USER
  // ============================
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isAdmin =
    user?.role?.toLowerCase() === "admin";

  // ============================
  // GET CUSTOMERS
  // ============================
  const getCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/v1/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(res.data || []);
    } catch (error) {
      console.error(error);
      setError("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  // ============================
  // DELETE
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

      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Unable to delete customer.");
    }
  };

  // ============================
  // EDIT
  // ============================
  const editCustomer = (id) => {
    navigate(`/editcustomer/${id}`);
  };

  // ============================
  // STATISTICS
  // ============================
  const totalCustomers = customers.length;

  const totalAdmins = customers.filter(
    (customer) =>
      customer.role?.toLowerCase() === "admin"
  ).length;

  const totalUsers = customers.filter(
    (customer) =>
      customer.role?.toLowerCase() === "user"
  ).length;

  // ============================
  // FILTER
  // ============================
  const filteredCustomers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !value ||
        String(customer.id).includes(value) ||
        customer.name?.toLowerCase().includes(value) ||
        customer.email?.toLowerCase().includes(value) ||
        customer.phone?.toLowerCase().includes(value) ||
        customer.city?.toLowerCase().includes(value);

      const matchesRole =
        roleFilter === "all" ||
        customer.role?.toLowerCase() === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [customers, search, roleFilter]);

  // ============================
  // INITIAL
  // ============================
  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "?";
  };

  return (
    <div className="customers-page">

      <div className="customers-container">

        {/* =================================
            PAGE HEADER
        ================================= */}
        <div className="page-header">

          <div className="page-heading">

            <div className="heading-icon">
              <span>👥</span>
            </div>

            <div>
              <div className="eyebrow">
                CUSTOMER MANAGEMENT
              </div>

              <h1>Customers</h1>

              <p>
                Manage your customers, accounts and
                access from one place.
              </p>
            </div>

          </div>

          {isAdmin && (
            <button
              className="primary-btn"
              onClick={() =>
                navigate("/addcustomer")
              }
            >
              <span className="plus-icon">+</span>
              New Customer
            </button>
          )}

        </div>


        {/* =================================
            STATISTICS
        ================================= */}
        <div className="stats-wrapper">

          {/* Total */}
          <div className="modern-stat total-stat">

            <div className="stat-top">
              <span>Total Customers</span>

              <div className="stat-symbol">
                👥
              </div>
            </div>

            <div className="stat-number">
              {totalCustomers}
            </div>

            <div className="stat-bottom">
              <span className="status-dot"></span>
              All registered accounts
            </div>

          </div>


          {/* Admin */}
          <div className="modern-stat admin-stat">

            <div className="stat-top">
              <span>Administrators</span>

              <div className="stat-symbol">
                🛡️
              </div>
            </div>

            <div className="stat-number">
              {totalAdmins}
            </div>

            <div className="stat-bottom">
              <span className="status-dot"></span>
              Admin accounts
            </div>

          </div>


          {/* Users */}
          <div className="modern-stat user-stat">

            <div className="stat-top">
              <span>Normal Users</span>

              <div className="stat-symbol">
                👤
              </div>
            </div>

            <div className="stat-number">
              {totalUsers}
            </div>

            <div className="stat-bottom">
              <span className="status-dot"></span>
              Registered users
            </div>

          </div>

        </div>


        {/* =================================
            MAIN CUSTOMER PANEL
        ================================= */}
        <div className="customers-panel">

          {/* Panel Header */}
          <div className="panel-header">

            <div>
              <div className="panel-title-row">
                <h2>Customer Directory</h2>

                <span className="total-pill">
                  {filteredCustomers.length}
                </span>
              </div>

              <p>
                Browse and manage customer information.
              </p>
            </div>

          </div>


          {/* =================================
              TOOLBAR
          ================================= */}
          <div className="customer-toolbar">

            <div className="search-container">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                placeholder="Search customers..."
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  className="clear-btn"
                  onClick={() => setSearch("")}
                >
                  ×
                </button>
              )}

            </div>


            {/* Role Filter */}
            <div className="filter-container">

              <span>Filter:</span>

              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value)
                }
              >
                <option value="all">
                  All Customers
                </option>

                <option value="admin">
                  Administrators
                </option>

                <option value="user">
                  Normal Users
                </option>
              </select>

            </div>

          </div>


          {/* =================================
              CONTENT
          ================================= */}
          {loading ? (

            <div className="empty-state">

              <div className="loader"></div>

              <h3>Loading customers</h3>

              <p>
                Fetching customer information...
              </p>

            </div>

          ) : error ? (

            <div className="empty-state">

              <div className="empty-icon error">
                !
              </div>

              <h3>Unable to load customers</h3>

              <p>{error}</p>

              <button
                className="secondary-btn"
                onClick={getCustomers}
              >
                Try Again
              </button>

            </div>

          ) : filteredCustomers.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                {search ? "⌕" : "👥"}
              </div>

              <h3>
                {search
                  ? "No customers found"
                  : "No customers yet"}
              </h3>

              <p>
                {search
                  ? "Try changing your search or filter."
                  : "Start by adding your first customer."}
              </p>

              {search ? (
                <button
                  className="secondary-btn"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("all");
                  }}
                >
                  Clear Filters
                </button>
              ) : (
                isAdmin && (
                  <button
                    className="primary-btn"
                    onClick={() =>
                      navigate("/addcustomer")
                    }
                  >
                    + Add Customer
                  </button>
                )
              )}

            </div>

          ) : (

            <div className="table-scroll">

              <table className="modern-table">

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Role</th>
                    <th className="actions-heading">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredCustomers.map((customer) => {

                    const role =
                      customer.role?.toLowerCase();

                    const isCustomerAdmin =
                      role === "admin";

                    return (
                      <tr key={customer.id}>

                        {/* CUSTOMER */}
                        <td>

                          <div className="customer-cell">

                            <div className="avatar">
                              {getInitial(
                                customer.name
                              )}
                            </div>

                            <div className="customer-name">

                              <strong>
                                {customer.name ||
                                  "Unknown"}
                              </strong>

                              <span>
                                ID #{customer.id}
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* CONTACT */}
                        <td>

                          <div className="contact-cell">

                            <span>
                              ✉{" "}
                              {customer.email ||
                                "No email"}
                            </span>

                            <small>
                              ☎{" "}
                              {customer.phone ||
                                "No phone"}
                            </small>

                          </div>

                        </td>


                        {/* LOCATION */}
                        <td>

                          <span className="location">
                            <span>📍</span>
                            {customer.city ||
                              "Not specified"}
                          </span>

                        </td>


                        {/* ROLE */}
                        <td>

                          {isCustomerAdmin ? (
                            <span className="role admin">
                              <span></span>
                              Admin
                            </span>
                          ) : (
                            <span className="role user">
                              <span></span>
                              User
                            </span>
                          )}

                        </td>


                        {/* ACTIONS */}
                        <td>

                          {isAdmin ? (

                            <div className="table-actions">

                              <button
                                className="action edit"
                                onClick={() =>
                                  editCustomer(
                                    customer.id
                                  )
                                }
                                title="Edit customer"
                              >
                                ✎
                              </button>

                              <button
                                className="action delete"
                                onClick={() =>
                                  deleteCustomer(
                                    customer.id
                                  )
                                }
                                title="Delete customer"
                              >
                                ×
                              </button>

                            </div>

                          ) : (

                            <span className="view-label">
                              View only
                            </span>

                          )}

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}