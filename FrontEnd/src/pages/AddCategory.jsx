import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/v1/categories",
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Created:", res.data);

      alert("Category Added Successfully");

      navigate("/categories");
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert("Category Add Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            
            {/* Card Header */}
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add Category</h4>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Category Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Category Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Category
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/categories")}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
