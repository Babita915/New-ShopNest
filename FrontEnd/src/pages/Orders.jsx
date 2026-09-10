import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // =========================
    // GET ALL ORDERS
    // =========================
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);
     const res = await axios.get(
    "http://localhost:5000/api/v1/orders",
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

            setOrders(res.data);
        } catch (err) {
            console.log("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // =========================
    // DELETE ORDER
    // =========================
    const deleteOrder = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token")
            await axios.delete(
                `http://localhost:5000/api/v1/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order deleted successfully!");

            fetchOrders();
        } catch (err) {
            console.log("Error deleting order:", err);
            alert("Failed to delete order");
        }
    };

    // =========================
    // EDIT ORDER
    // =========================
    const editOrder = (id) => {
        navigate(`/editorder/${id}`);
    };

    return (
        <>
            <div className="container mt-5">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Orders</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/addorder")}
                    >
                        Add Order
                    </button>
                </div>

                {/* TABLE */}
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Order Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.length > 0 ? (
                                orders.map((item) => (
                                    <tr key={item.id}>

                                        <td>{item.id}</td>

                                        <td>{item.customer_id}</td>

                                        <td>
                                            ₹{item.total_amount}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    item.status === "completed"
                                                        ? "bg-success"
                                                        : item.status === "pending"
                                                        ? "bg-warning text-dark"
                                                        : item.status === "cancelled"
                                                        ? "bg-danger"
                                                        : "bg-secondary"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>
                                            {item.order_date}
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() =>
                                                    editOrder(item.id)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteOrder(item.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center"
                                    >
                                        No Orders Found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

            </div>
        </>
    );
}
