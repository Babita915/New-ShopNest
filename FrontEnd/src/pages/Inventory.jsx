import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // GET INVENTORY
  // =========================
  const fetchInventory = async () => {
    try {
      setLoading(true);

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
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/v1/inventory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Inventory Deleted Successfully");

      fetchInventory();
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      alert("Delete Failed");
    }
  };

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
    (item) => Number(item.stock) > 0 && Number(item.stock) <= 20
  ).length;

  const outOfStock = inventory.filter(
    (item) => Number(item.stock) === 0
  ).length;

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      <div className="container">

        {/* ================= HEADER ================= */}

        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

              <div>
                <h2 className="fw-bold mb-1">
                  📦 Inventory Management
                </h2>

                <p className="text-muted mb-0">
                  Manage product stock and inventory
                </p>
              </div>

              <button
                className="btn btn-primary px-4"
                onClick={() =>
                  navigate("/add-inventory")
                }
              >
                <i className="bi bi-plus-lg"></i>{" "}
                + Add Inventory
              </button>

            </div>

          </div>

        </div>


        {/* ================= STATISTICS ================= */}

        <div className="row g-4 mb-4">

          {/* Total Items */}

          <div className="col-lg-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Total Items
                    </p>

                    <h2 className="fw-bold mb-0">
                      {totalItems}
                    </h2>

                  </div>

                  <div className="bg-primary text-white rounded-circle p-3 fs-4">
                    📦
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Total Stock */}

          <div className="col-lg-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Total Stock
                    </p>

                    <h2 className="fw-bold mb-0">
                      {totalStock}
                    </h2>

                  </div>

                  <div className="bg-success text-white rounded-circle p-3 fs-4">
                    📊
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Low Stock */}

          <div className="col-lg-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Low Stock
                    </p>

                    <h2 className="fw-bold mb-0">
                      {lowStock}
                    </h2>

                  </div>

                  <div className="bg-warning text-dark rounded-circle p-3 fs-4">
                    ⚠️
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Out Of Stock */}

          <div className="col-lg-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Out of Stock
                    </p>

                    <h2 className="fw-bold mb-0">
                      {outOfStock}
                    </h2>

                  </div>

                  <div className="bg-danger text-white rounded-circle p-3 fs-4">
                    ❌
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= INVENTORY TABLE ================= */}

        <div className="card border-0 shadow-sm">

          <div className="card-body">

            {/* Table Header */}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

              <div>

                <h5 className="fw-bold mb-1">
                  Inventory List
                </h5>

                <small className="text-muted">
                  Manage all product stock
                </small>

              </div>


              {/* Search */}

              <div style={{ maxWidth: "300px", width: "100%" }}>

                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search Product ID..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            {/* Loading */}

            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

                <p className="text-muted mt-3">
                  Loading inventory...
                </p>

              </div>

            ) : filteredInventory.length === 0 ? (

              /* Empty */

              <div className="text-center py-5">

                <div className="display-3 mb-3">
                  📦
                </div>

                <h5 className="fw-bold">
                  No Inventory Found
                </h5>

                <p className="text-muted">
                  No inventory records are available.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/add-inventory")
                  }
                >
                  + Add Inventory
                </button>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>

                      <th>Product</th>

                      <th>Stock</th>

                      <th>Stock Level</th>

                      <th>Status</th>

                      <th className="text-center">
                        Action
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

                        return (

                          <tr key={item.id}>

                            {/* ID */}

                            <td>

                              <span className="badge bg-secondary">
                                #{item.id}
                              </span>

                            </td>


                            {/* Product */}

                            <td>

                              <span className="badge bg-info text-dark">
                                Product #{item.product_id}
                              </span>

                            </td>


                            {/* Stock */}

                            <td>

                              <strong className="fs-6">
                                {stock}
                              </strong>

                              <small className="text-muted ms-1">
                                units
                              </small>

                            </td>


                            {/* Progress */}

                            <td style={{ minWidth: "150px" }}>

                              <div
                                className="progress"
                                style={{
                                  height: "8px",
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

                            </td>


                            {/* Status */}

                            <td>

                              {stock === 0 ? (

                                <span className="badge bg-danger">
                                  Out of Stock
                                </span>

                              ) : stock <= 20 ? (

                                <span className="badge bg-warning text-dark">
                                  Low Stock
                                </span>

                              ) : (

                                <span className="badge bg-success">
                                  In Stock
                                </span>

                              )}

                            </td>


                            {/* Actions */}

                            <td className="text-center">

                              <button
                                className="btn btn-outline-success btn-sm me-2"
                                onClick={() =>
                                  navigate(
                                    `/editinventory/${item.id}`
                                  )
                                }
                              >
                                ✏️ Edit
                              </button>

                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                  deleteInventory(
                                    item.id
                                  )
                                }
                              >
                                🗑️ Delete
                              </button>

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

      </div>

    </div>
  );
}