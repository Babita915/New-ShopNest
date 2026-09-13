import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
    const navigate = useNavigate();

    const [inventory, setInventory] = useState({
        product_id: "",
        stock: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =========================
    // HANDLE CHANGE
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInventory((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // =========================
    // ADD INVENTORY
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/v1/inventory",
                {
                    product_id: Number(inventory.product_id),
                    stock: Number(inventory.stock)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Inventory Added:", response.data);

            setMessage("Inventory added successfully.");

            setInventory({
                product_id: "",
                stock: ""
            });

            setTimeout(() => {
                navigate("/inventory");
            }, 1000);

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Unable to add inventory"
            );
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
                    maxWidth: "750px",
                    borderRadius: "16px",
                    overflow: "hidden"
                }}
            >

                {/* ================= HEADER ================= */}

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
                                backgroundColor:
                                    "rgba(255,255,255,0.18)"
                            }}
                        >
                            <i className="bi bi-box-seam fs-4"></i>
                        </div>

                        <div>

                            <h3 className="mb-1 fw-semibold">
                                Add Inventory
                            </h3>

                            <p className="mb-0 opacity-75">
                                Add stock for a product
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= BODY ================= */}

                <div className="card-body p-4 p-md-5">

                    {/* SUCCESS MESSAGE */}

                    {message && (
                        <div
                            className="alert alert-success border-0 shadow-sm d-flex justify-content-between align-items-center"
                            style={{
                                borderRadius: "12px"
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

                    {/* ERROR MESSAGE */}

                    {error && (
                        <div
                            className="alert alert-danger border-0 shadow-sm d-flex justify-content-between align-items-center"
                            style={{
                                borderRadius: "12px"
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

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* ================= PRODUCT ID ================= */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Product ID
                                </label>

                                <div className="input-group">

                                    <span
                                        className="input-group-text"
                                        style={{
                                            backgroundColor: "#eff6ff"
                                        }}
                                    >
                                        <i
                                            className="bi bi-box"
                                            style={{
                                                color: "#1e3a8a"
                                            }}
                                        ></i>
                                    </span>

                                    <input
                                        type="number"
                                        name="product_id"
                                        className="form-control"
                                        placeholder="Enter product ID"
                                        value={inventory.product_id}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />

                                </div>

                                <small className="text-muted">
                                    Enter the ID of the product for which
                                    you want to add stock.
                                </small>

                            </div>

                            {/* ================= STOCK ================= */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Stock Quantity
                                </label>

                                <div className="input-group">

                                    <span
                                        className="input-group-text"
                                        style={{
                                            backgroundColor: "#eff6ff"
                                        }}
                                    >
                                        <i
                                            className="bi bi-bar-chart"
                                            style={{
                                                color: "#1e3a8a"
                                            }}
                                        ></i>
                                    </span>

                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-control"
                                        placeholder="Enter stock quantity"
                                        value={inventory.stock}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />

                                    <span
                                        className="input-group-text"
                                        style={{
                                            backgroundColor: "#eff6ff",
                                            color: "#6c757d"
                                        }}
                                    >
                                        units
                                    </span>

                                </div>

                                <small className="text-muted">
                                    Enter the number of available units.
                                </small>

                            </div>

                        </div>

                        {/* ================= BUTTONS ================= */}

                        <div className="d-flex justify-content-end gap-2 mt-5">

                            {/* CANCEL */}

                            <button
                                type="button"
                                className="btn px-4"
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #ced4da"
                                }}
                                onClick={() =>
                                    navigate("/inventory")
                                }
                                disabled={loading}
                            >

                                <i className="bi bi-x-lg me-2"></i>

                                Cancel

                            </button>

                            {/* ADD */}

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

                                        Add Inventory
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
