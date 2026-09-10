import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // GET CATEGORIES
  // =========================
  const fetchCategories = async () => {
    try {
      setLoading(true);

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
      console.log(
        error.response?.data || error.message
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
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/v1/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Category deleted successfully");

      fetchCategories();
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      alert(
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

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      <div className="container">

        {/* ================= HEADER ================= */}

        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

              <div>
                <h2 className="fw-bold mb-1">
                  🗂️ Categories
                </h2>

                <p className="text-muted mb-0">
                  Manage your product categories
                </p>
              </div>

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


        {/* ================= STATISTICS ================= */}

        <div className="row g-4 mb-4">

          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Total Categories
                    </p>

                    <h2 className="fw-bold mb-0">
                      {categories.length}
                    </h2>

                  </div>

                  <div className="bg-primary text-white rounded-circle p-3 fs-4">
                    🗂️
                  </div>

                </div>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Search Results
                    </p>

                    <h2 className="fw-bold mb-0">
                      {filteredCategories.length}
                    </h2>

                  </div>

                  <div className="bg-success text-white rounded-circle p-3 fs-4">
                    🔍
                  </div>

                </div>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-1">
                      Status
                    </p>

                    <h5 className="fw-bold mb-0 text-success">
                      Active
                    </h5>

                  </div>

                  <div className="bg-success text-white rounded-circle p-3 fs-4">
                    ✓
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= CATEGORY LIST ================= */}

        <div className="card border-0 shadow-sm">

          <div className="card-body">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

              <div>

                <h5 className="fw-bold mb-1">
                  Category List
                </h5>

                <small className="text-muted">
                  All available product categories
                </small>

              </div>


              {/* SEARCH */}

              <div
                style={{
                  maxWidth: "300px",
                  width: "100%",
                }}
              >

                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search category..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            {/* ================= LOADING ================= */}

            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

                <p className="text-muted mt-3">
                  Loading categories...
                </p>

              </div>

            ) : filteredCategories.length === 0 ? (

              /* ================= EMPTY ================= */

              <div className="text-center py-5">

                <div className="display-3 mb-3">
                  🗂️
                </div>

                <h5 className="fw-bold">
                  No Categories Found
                </h5>

                <p className="text-muted">
                  Add your first category to get started.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/addcategory")
                  }
                >
                  + Add Category
                </button>

              </div>

            ) : (

              /* ================= TABLE ================= */

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>

                      <th>Category Name</th>

                      <th>Status</th>

                      <th className="text-center">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredCategories.map(
                      (category) => (

                        <tr key={category.id}>

                          {/* ID */}

                          <td>

                            <span className="badge bg-secondary">
                              #{category.id}
                            </span>

                          </td>


                          {/* NAME */}

                          <td>

                            <div className="d-flex align-items-center">

                              <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                }}
                              >
                                🗂️
                              </div>

                              <span className="fw-semibold">
                                {category.name}
                              </span>

                            </div>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span className="badge bg-success">
                              Active
                            </span>

                          </td>


                          {/* ACTION */}

                          <td className="text-center">

                            <button
                              className="btn btn-outline-success btn-sm me-2"
                              onClick={() =>
                                navigate(
                                  `/editcategory/${category.id}`
                                )
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                deleteCategory(
                                  category.id
                                )
                              }
                            >
                              🗑️ Delete
                            </button>

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

      </div>

    </div>
  );
}