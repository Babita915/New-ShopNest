import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const [product, setProduct] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/products/${id}`
      );

      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/v1/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Product Updated Successfully");
      navigate("/products");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Edit Product</h2>

        <form onSubmit={updateProduct}>
          <div className="mb-3">
            <label className="form-label">Category ID</label>
            <input
              type="number"
              className="form-control"
              value={product.category_id || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category_id: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={product.name || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={product.description || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={product.price || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value,
                })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" onClick={()=>navigate("/product")}>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}