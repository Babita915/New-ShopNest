import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =========================
  // GET CATEGORIES
  // =========================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/v1/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Categories:", res.data);

      setCategories(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Unable to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // DELETE CATEGORY
  // =========================
  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/v1/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Category deleted successfully.");

      // Remove category directly from UI
      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );

      // Message hide after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Category delete failed"
      );
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredCategories = categories.filter(
    (category) =>
      category.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================
  // CLEAR SEARCH
  // =========================
  const clearSearch = () => {
    setSearch("");
  };

  // =========================
  // CATEGORY INITIAL
  // =========================
  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "C";
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
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "46px",
                      height: "46px",
                      backgroundColor: "#0d6efd",
                      color: "white",
                      fontSize: "22px",
                    }}
                  >
                    🗂️
                  </div>

                  <h2 className="fw-bold mb-0">
                    Categories
                  </h2>
                </div>

                <p className="text-muted mb-0">
                  Manage and organize your product categories
                </p>
              </div>

              <div className="d-flex gap-2">

                <button
                  className="btn btn-light border px-3"
                  onClick={fetchCategories}
                  disabled={loading}
                >
                  🔄 Refresh
                </button>

                <button
                  className="btn btn-primary px-4"
                  onClick={() =>
                    navigate("/addcategory")
                  }
                >
                  + Add Category
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* ================= MESSAGE ================= */}

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

          {/* TOTAL */}

          <div className="col-md-4">
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
                      Total Categories
                    </p>

                    <h2 className="fw-bold mb-0">
                      {categories.length}
                    </h2>

                    <small className="text-muted">
                      All categories
                    </small>
                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e7f0ff",
                      fontSize: "26px",
                    }}
                  >
                    🗂️
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* SEARCH RESULT */}

          <div className="col-md-4">
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
                      Search Results
                    </p>

                    <h2 className="fw-bold mb-0">
                      {filteredCategories.length}
                    </h2>

                    <small className="text-muted">
                      Matching categories
                    </small>
                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e8f8ef",
                      fontSize: "26px",
                    }}
                  >
                    🔍
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* STATUS */}

          <div className="col-md-4">
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
                      Category Status
                    </p>

                    <h4 className="fw-bold text-success mb-1">
                      Active
                    </h4>

                    <small className="text-muted">
                      System is running normally
                    </small>
                  </div>

                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e8f8ef",
                      fontSize: "26px",
                    }}
                  >
                    ✓
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ================= CATEGORY TABLE ================= */}

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
                  Category List
                </h5>

                <small className="text-muted">
                  View, edit and manage all product categories
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
                  placeholder="Search category..."
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
                  Loading categories...
                </p>

              </div>

            ) : filteredCategories.length === 0 ? (

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
                  🗂️
                </div>

                <h5 className="fw-bold">
                  {search
                    ? "No Matching Categories"
                    : "No Categories Found"}
                </h5>

                <p className="text-muted">
                  {search
                    ? `No category found for "${search}".`
                    : "Add your first category to get started."}
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
                      navigate("/addcategory")
                    }
                  >
                    + Add Category
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
                        Category
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

                    {filteredCategories.map(
                      (category) => (

                        <tr key={category.id}>

                          {/* ID */}

                          <td>

                            <span
                              className="badge rounded-pill"
                              style={{
                                backgroundColor: "#f0f2f5",
                                color: "#495057",
                                padding: "8px 12px",
                              }}
                            >
                              #{category.id}
                            </span>

                          </td>

                          {/* CATEGORY */}

                          <td>

                            <div className="d-flex align-items-center">

                              <div
                                className="rounded-3 d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  backgroundColor: "#e7f0ff",
                                  color: "#0d6efd",
                                  fontWeight: "700",
                                  fontSize: "18px",
                                }}
                              >
                                {getInitial(
                                  category.name
                                )}
                              </div>

                              <div>

                                <div className="fw-semibold">
                                  {category.name}
                                </div>

                                <small className="text-muted">
                                  Product Category
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
                              ● Active
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td className="text-center">

                            <div className="d-flex justify-content-center gap-2">

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  navigate(
                                    `/editcategory/${category.id}`
                                  )
                                }
                                title="Edit Category"
                              >
                                ✏️ Edit
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteCategory(
                                    category.id
                                  )
                                }
                                title="Delete Category"
                              >
                                🗑️ Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </div>

        {/* ================= FOOTER INFO ================= */}

        {!loading &&
          filteredCategories.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3 px-1">

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredCategories.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {categories.length}
                </strong>{" "}
                categories
              </small>

              {search && (
                <small className="text-muted">
                  Search:{" "}
                  <strong>"{search}"</strong>
                </small>
              )}

            </div>
          )}

      </div>
    </div>
  );
}