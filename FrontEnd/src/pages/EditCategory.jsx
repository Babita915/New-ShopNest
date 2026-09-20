import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
  const [category, setCategory] = useState({
    name: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // GET CATEGORY BY ID
  // =========================
  const fetchCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/v1/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategory(res.data.data);
      console.log(res.data);
      console.log("FULL API RESPONSE:", res.data);
      console.log("CATEGORY DATA:", res.data.data);

    } catch (err) {
      console.log(
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchCategory(id);
  }, [id]);


  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };


  // =========================
  // UPDATE CATEGORY
  // =========================
  const updateCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/v1/categories/${id}`,
        {
          name: category.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Category Updated Successfully");

      navigate("/categories");

    } catch (err) {
      console.log(
        err.response?.data || err.message
      );

      alert("Update Failed");
    }
  };


  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h4 className="text-center mb-4">
          Edit Category
        </h4>

        {/* Category Name */}
        <div className="mb-3">
          <label className="form-label">
            Category Name
          </label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={category?.name || ""}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </div>


        {/* Update Button */}
        <button
          className="btn btn-primary"
          onClick={updateCategory}
        >
          Update Category
        </button>

      </div>

    </div>
  );
}