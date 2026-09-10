import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        image: "",
        name: "",
        discription:"",
        price: ""
    });


    const handleChange = (e) => {
        if(e.target.name === "image") {
            setProduct({
                ...product,
                image: e.target.files[0]
            });
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/product")
    }
    return (
      <>
      <div className="container mt-4">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
            <div className="mt-4">
  <label className="form-label">Image</label>

  <input
    type="file"
    name="image"
    className="form-control"
    accept="image/*"
    onChange={handleChange}
  />
</div>

             <div className="mt-4">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" onChange={handleChange} value={product.name} />
            </div>

             <div className="mt-4">
                <label className="form-label">Description</label>
                <input type="text" name="description" className="form-control" onChange={handleChange} value={product.description} />
            </div>

             <div className="mt-4">
                <label className="form-label">Price</label>
                <input type="text" name="price" className="form-control" onChange={handleChange} value={product.price} />
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
      </div>
      </>
    )
}