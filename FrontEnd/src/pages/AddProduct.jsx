import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        image: null,
        name: "",
        description: "",
        price: ""
    });

    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];

            setProduct((prev) => ({
                ...prev,
                image: file
            }));

            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setProduct((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Yaha baad me axios.post() lagega
            console.log("Product Data:", product);

            setTimeout(() => {
                navigate("/product");
            }, 1000);

        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container-fluid py-5"
            style={{
                backgroundColor: "#f5f7fb",
                minHeight: "100vh"
            }}
        >

            <div
                className="card border-0 shadow mx-auto"
                style={{
                    maxWidth: "900px",
                    borderRadius: "16px",
                    overflow: "hidden"
                }}
            >

                {/* Header */}
                <div
                    className="text-white p-4"
                    style={{
                        backgroundColor: "#1e3a8a"
                    }}
                >
                    <div className="d-flex align-items-center">

                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "rgba(255,255,255,0.18)"
                            }}
                        >
                            <i className="bi bi-box-seam fs-4"></i>
                        </div>

                        <div>
                            <h3 className="mb-1 fw-semibold">
                                Add Product
                            </h3>

                            <p className="mb-0 opacity-75">
                                Add a new product to your store
                            </p>
                        </div>

                    </div>
                </div>

                {/* Form */}
                <div className="card-body p-4 p-md-5">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* Product Image */}
                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Product Image
                                </label>

                                <div className="row align-items-center">

                                    <div className="col-md-8">

                                        <div className="input-group">

                                            <span
                                                className="input-group-text"
                                                style={{
                                                    backgroundColor: "#eff6ff"
                                                }}
                                            >
                                                <i
                                                    className="bi bi-image"
                                                    style={{
                                                        color: "#1e3a8a"
                                                    }}
                                                ></i>
                                            </span>

                                            <input
                                                type="file"
                                                name="image"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <small className="text-muted">
                                            Upload a clear product image.
                                        </small>

                                    </div>

                                    {/* Image Preview */}
                                    {preview && (
                                        <div className="col-md-4 mt-3 mt-md-0 text-center">

                                            <img
                                                src={preview}
                                                alt="Product Preview"
                                                className="img-thumbnail"
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px"
                                                }}
                                            />

                                            <div className="small text-muted mt-1">
                                                Image Preview
                                            </div>

                                        </div>
                                    )}

                                </div>

                            </div>

                            {/* Product Name */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Product Name
                                </label>

                                <div className="input-group">

                                    <span
                                        className="input-group-text"
                                        style={{
                                            backgroundColor: "#eff6ff"
                                        }}
                                    >
                                        <i
                                            className="bi bi-tag"
                                            style={{
                                                color: "#1e3a8a"
                                            }}
                                        ></i>
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter product name"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            {/* Price */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Price
                                </label>

                                <div className="input-group">

                                    <span
                                        className="input-group-text fw-semibold"
                                        style={{
                                            backgroundColor: "#eff6ff",
                                            color: "#1e3a8a"
                                        }}
                                    >
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Enter product price"
                                        value={product.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                    />

                                </div>

                            </div>

                            {/* Description */}
                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter product description"
                                    value={product.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <small className="text-muted">
                                    Write a short description about the product.
                                </small>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-5">

                            <button
                                type="button"
                                className="btn px-4"
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #ced4da"
                                }}
                                onClick={() => navigate("/product")}
                                disabled={loading}
                            >
                                <i className="bi bi-x-lg me-2"></i>
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn text-white px-4"
                                style={{
                                    backgroundColor: "#1e3a8a"
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>

                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-plus-lg me-2"></i>
                                        Add Product
                                    </>
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
