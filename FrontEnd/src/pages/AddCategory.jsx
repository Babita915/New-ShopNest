import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const inputRef = useRef(null);

  // =========================
  // AUTO FOCUS
  // =========================
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryName = name.trim();

    // Validation
    if (!categoryName) {
      setError("Please enter category name.");
      return;
    }

    if (categoryName.length < 2) {
      setError("Category name must contain at least 2 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/v1/categories",
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Created:", res.data);

      // Success message
      alert("Category Added Successfully");

      navigate("/categories");
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Category could not be added. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setName(e.target.value);

    if (error) {
      setError("");
    }
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        backgroundColor: "#f5f7fb",
      }}
    >
      <div className="container">

        {/* =========================
            TOP HEADER
        ========================= */}

        <div className="d-flex align-items-center mb-4">

          <button
            type="button"
            className="btn btn-light border me-3"
            onClick={() => navigate("/categories")}
          >
            ← Back
          </button>

          <div>
            <h2 className="fw-bold mb-1">
              Add Category
            </h2>

            <p className="text-muted mb-0">
              Create a new product category
            </p>
          </div>

        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <div className="row justify-content-center">

          <div className="col-lg-7 col-md-9">

            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "18px",
              }}
            >

              {/* CARD HEADER */}

              <div
                className="card-body p-4 p-md-5 text-center"
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >

                <div
                  className="mx-auto mb-3 rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#e7f0ff",
                    fontSize: "34px",
                  }}
                >
                  🗂️
                </div>

                <h4 className="fw-bold mb-2">
                  Create New Category
                </h4>

                <p className="text-muted mb-0">
                  Add a category to organize your products
                </p>

              </div>

              {/* =========================
                  FORM BODY
              ========================= */}

              <div className="card-body p-4 p-md-5">

                {/* ERROR */}

                {error && (
                  <div
                    className="alert alert-danger border-0 d-flex align-items-center"
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    <span className="me-2">
                      ⚠️
                    </span>

                    <span>
                      {error}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* CATEGORY NAME */}

                  <div className="mb-4">

                    <div className="d-flex justify-content-between align-items-center mb-2">

                      <label
                        htmlFor="categoryName"
                        className="form-label fw-semibold mb-0"
                      >
                        Category Name
                      </label>

                      <small className="text-muted">
                        {name.length}/50
                      </small>

                    </div>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        🏷️
                      </span>

                      <input
                        ref={inputRef}
                        id="categoryName"
                        type="text"
                        className="form-control"
                        value={name}
                        maxLength={50}
                        onChange={handleChange}
                        placeholder="e.g. Electronics"
                        disabled={loading}
                      />

                    </div>

                    <small className="text-muted">
                      Enter a clear and meaningful category name.
                    </small>

                  </div>

                  {/* PREVIEW */}

                  {name.trim() && (
                    <div
                      className="mb-4 p-3"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                      }}
                    >

                      <small className="text-muted d-block mb-2">
                        Category Preview
                      </small>

                      <div className="d-flex align-items-center">

                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "46px",
                            height: "46px",
                            backgroundColor: "#e7f0ff",
                            color: "#0d6efd",
                            fontWeight: "700",
                            fontSize: "20px",
                          }}
                        >
                          {name
                            .trim()
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <div className="fw-semibold">
                            {name.trim()}
                          </div>

                          <small className="text-muted">
                            Product Category
                          </small>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* BUTTONS */}

                  <div className="d-flex flex-column flex-sm-row gap-2">

                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2"
                      disabled={loading}
                    >

                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>

                          Adding...
                        </>
                      ) : (
                        <>
                          ✓ Add Category
                        </>
                      )}

                    </button>

                    <button
                      type="button"
                      className="btn btn-light border px-4 py-2"
                      onClick={() =>
                        navigate("/categories")
                      }
                      disabled={loading}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>

            </div>

            {/* =========================
                INFORMATION
            ========================= */}

            <div className="text-center mt-3">

              <small className="text-muted">
                💡 You can edit or delete this category later
                from the Categories page.
              </small>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}