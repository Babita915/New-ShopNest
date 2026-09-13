import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =========================
  // GET INVENTORY
  // =========================
  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/v1/inventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Inventory:", response.data);

      setInventory(response.data);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to load inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE INVENTORY
  // =========================
  const deleteInventory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inventory?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/v1/inventory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Inventory deleted successfully.");

      // Remove deleted item directly from UI
      setInventory((prev) =>
        prev.filter((item) => item.id !== id)
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Inventory delete failed"
      );
    }
  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    fetchInventory();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredInventory = inventory.filter((item) =>
    String(item.product_id)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // STATISTICS
  // =========================

  const totalItems = inventory.length;

  const totalStock = inventory.reduce(
    (total, item) =>
      total + Number(item.stock || 0),
    0
  );

  const lowStock = inventory.filter(
    (item) =>
      Number(item.stock) > 0 &&
      Number(item.stock) <= 20
  ).length;

  const outOfStock = inventory.filter(
    (item) => Number(item.stock) === 0
  ).length;

  const inStock = inventory.filter(
    (item) => Number(item.stock) > 20
  ).length;

  // =========================
  // CLEAR SEARCH
  // =========================
  const clearSearch = () => {
    setSearch("");
  };

  // =========================
  // STOCK STATUS
  // =========================
  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        text: "Out of Stock",
        className: "bg-danger-subtle text-danger",
      };
    }

    if (stock <= 20) {
      return {
        text: "Low Stock",
        className: "bg-warning-subtle text-warning-emphasis",
      };
    }

    return {
      text: "In Stock",
      className: "bg-success-subtle text-success",
    };
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        backgroundColor: "#f5f7fb",
      }}
    >
      <div className="container-fluid px-3 px-md-4">

        {/* ================= HEADER ================= */}

        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: "16px",
          }}
        >
          <div className="card-body p-4">

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">

              <div>

                <div className="d-flex align-items-center gap-2 mb-2">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "46px",
                      height: "46px",
                      backgroundColor: "#0d6efd",
                      color: "white",
                      fontSize: "23px",
                    }}
                  >
                    📦
                  </div>

                  <h2 className="fw-bold mb-0">
                    Inventory Management
                  </h2>

                </div>

                <p className="text-muted mb-0">
                  Monitor product stock and inventory levels
                </p>

              </div>

              <div className="d-flex gap-2">

                <button
                  className="btn btn-light border px-3"
                  onClick={fetchInventory}
                  disabled={loading}
                >
                  🔄 Refresh
                </button>

                <button
                  className="btn btn-primary px-4"
                  onClick={() =>
                    navigate("/add-inventory")
                  }
                >
                  + Add Inventory
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* ================= MESSAGES ================= */}

        {message && (
          <div
            className="alert alert-success border-0 shadow-sm d-flex justify-content-between align-items-center"
            style={{
              borderRadius: "12px",
            }}
          >
            <span>
              ✓ {message}
            </span>

            <button
              className="btn-close"
              onClick={() => setMessage("")}
            ></button>
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger border-0 shadow-sm d-flex justify-content-between align-items-center"
            style={{
              borderRadius: "12px",
            }}
          >
            <span>
              ⚠️ {error}
            </span>

            <button
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        {/* ================= STATISTICS ================= */}

        <div className="row g-4 mb-4">

          {/* TOTAL ITEMS */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "16px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Items
                    </p>

                    <h2 className="fw-bold mb-1">
                      {totalItems}
                    </h2>

                    <small className="text-muted">
                      Inventory records
                    </small>

                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e7f0ff",
                      fontSize: "27px",
                    }}
                  >
                    📦
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* TOTAL STOCK */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "16px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Stock
                    </p>

                    <h2 className="fw-bold mb-1">
                      {totalStock}
                    </h2>

                    <small className="text-muted">
                      Total available units
                    </small>

                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e8f8ef",
                      fontSize: "27px",
                    }}
                  >
                    📊
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* LOW STOCK */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "16px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Low Stock
                    </p>

                    <h2 className="fw-bold mb-1">
                      {lowStock}
                    </h2>

                    <small className="text-muted">
                      20 units or less
                    </small>

                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#fff4d6",
                      fontSize: "27px",
                    }}
                  >
                    ⚠️
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* OUT OF STOCK */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "16px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Out of Stock
                    </p>

                    <h2 className="fw-bold mb-1">
                      {outOfStock}
                    </h2>

                    <small className="text-muted">
                      Requires restocking
                    </small>

                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#ffe8e8",
                      fontSize: "27px",
                    }}
                  >
                    ❌
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= QUICK SUMMARY ================= */}

        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: "16px",
          }}
        >

          <div className="card-body p-4">

            <div className="row align-items-center">

              <div className="col-lg-7 mb-3 mb-lg-0">

                <h5 className="fw-bold mb-1">
                  Stock Overview
                </h5>

                <p className="text-muted mb-0">
                  Current inventory status
                </p>

              </div>

              <div className="col-lg-5">

                <div className="d-flex justify-content-lg-end gap-2 flex-wrap">

                  <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
                    ● In Stock: {inStock}
                  </span>

                  <span className="badge rounded-pill bg-warning-subtle text-warning-emphasis px-3 py-2">
                    ● Low Stock: {lowStock}
                  </span>

                  <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-2">
                    ● Out: {outOfStock}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= INVENTORY TABLE ================= */}

        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "16px",
          }}
        >

          <div className="card-body p-4">

            {/* TABLE HEADER */}

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

              <div>

                <h5 className="fw-bold mb-1">
                  Inventory List
                </h5>

                <small className="text-muted">
                  View and manage all product stock
                </small>

              </div>

              {/* SEARCH */}

              <div
                className="input-group"
                style={{
                  maxWidth: "350px",
                }}
              >

                <span className="input-group-text bg-white">
                  🔍
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product ID..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

                {search && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={clearSearch}
                  >
                    ✕
                  </button>
                )}

              </div>

            </div>

            {/* ================= LOADING ================= */}

            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  style={{
                    width: "3rem",
                    height: "3rem",
                  }}
                  role="status"
                ></div>

                <p className="text-muted mt-3 mb-0">
                  Loading inventory...
                </p>

              </div>

            ) : filteredInventory.length === 0 ? (

              /* ================= EMPTY ================= */

              <div className="text-center py-5">

                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#f0f2f5",
                    fontSize: "35px",
                  }}
                >
                  📦
                </div>

                <h5 className="fw-bold">
                  {search
                    ? "No Matching Inventory"
                    : "No Inventory Found"}
                </h5>

                <p className="text-muted">
                  {search
                    ? `No inventory found for Product ID "${search}".`
                    : "No inventory records are available."}
                </p>

                {search ? (

                  <button
                    className="btn btn-outline-primary"
                    onClick={clearSearch}
                  >
                    Clear Search
                  </button>

                ) : (

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate("/add-inventory")
                    }
                  >
                    + Add Inventory
                  </button>

                )}

              </div>

            ) : (

              /* ================= TABLE ================= */

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead
                    style={{
                      backgroundColor: "#f8f9fa",
                    }}
                  >

                    <tr>

                      <th className="py-3">
                        ID
                      </th>

                      <th className="py-3">
                        Product_Id
                      </th>

                      <th className="py-3">
                        Stock
                      </th>

                      <th
                        className="py-3"
                        style={{
                          minWidth: "170px",
                        }}
                      >
                        Stock Level
                      </th>

                      <th className="py-3">
                        Status
                      </th>

                      <th className="py-3 text-center">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredInventory.map(
                      (item) => {

                        const stock =
                          Number(item.stock || 0);

                        const progress =
                          Math.min(
                            (stock / 500) * 100,
                            100
                          );

                        const status =
                          getStockStatus(stock);

                        return (

                          <tr key={item.id}>

                            {/* ID */}

                            <td>

                              <span
                                className="badge rounded-pill"
                                style={{
                                  backgroundColor:
                                    "#f0f2f5",
                                  color: "#495057",
                                  padding:
                                    "8px 12px",
                                }}
                              >
                                #{item.id}
                              </span>

                            </td>

                            {/* PRODUCT */}

                            <td>

                              <div className="d-flex align-items-center">

                                <div
                                  className="rounded-3 d-flex align-items-center justify-content-center me-3"
                                  style={{
                                    width: "44px",
                                    height: "44px",
                                    backgroundColor:
                                      "#e7f0ff",
                                    fontSize: "20px",
                                  }}
                                >
                                  📦
                                </div>

                                <div>

                                  <div className="fw-semibold">
                                    #{item.product_id}
                                  </div>

                                

                                </div>

                              </div>

                            </td>

                            {/* STOCK */}

                            <td>

                              <div>

                                <strong className="fs-5">
                                  {stock}
                                </strong>

                                <small className="text-muted ms-1">
                                  units
                                </small>

                              </div>

                            </td>

                            {/* PROGRESS */}

                            <td>

                              <div
                                className="progress mb-1"
                                style={{
                                  height: "8px",
                                  backgroundColor:
                                    "#e9ecef",
                                }}
                              >

                                <div
                                  className={`progress-bar ${
                                    stock === 0
                                      ? "bg-danger"
                                      : stock <= 20
                                      ? "bg-warning"
                                      : "bg-success"
                                  }`}
                                  style={{
                                    width: `${progress}%`,
                                  }}
                                ></div>

                              </div>

                              <small className="text-muted">
                                {Math.round(progress)}%
                                capacity
                              </small>

                            </td>

                            {/* STATUS */}

                            <td>

                              <span
                                className={`badge rounded-pill px-3 py-2 ${status.className}`}
                              >
                                ● {status.text}
                              </span>

                            </td>

                            {/* ACTIONS */}

                            <td className="text-center">

                              <div className="d-flex justify-content-center gap-2">

                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() =>
                                    navigate(
                                      `/editinventory/${item.id}`
                                    )
                                  }
                                  title="Edit Inventory"
                                >
                                  ✏️ Edit
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    deleteInventory(
                                      item.id
                                    )
                                  }
                                  title="Delete Inventory"
                                >
                                  🗑️ Delete
                                </button>

                              </div>

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        {!loading &&
          filteredInventory.length > 0 && (

            <div className="d-flex justify-content-between align-items-center mt-3 px-1">

              <small className="text-muted">

                Showing{" "}
                <strong>
                  {filteredInventory.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {inventory.length}
                </strong>{" "}
                inventory records

              </small>

              {search && (

                <small className="text-muted">

                  Search:{" "}
                  <strong>
                    "{search}"
                  </strong>

                </small>

              )}

            </div>

          )}

      </div>
    </div>
  );
}