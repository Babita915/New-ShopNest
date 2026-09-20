import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/order.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // =========================
    // GET ALL ORDERS
    // =========================

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/v1/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Orders:", res.data);

            setOrders(
                Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data.data)
                    ? res.data.data
                    : []
            );

        } catch (err) {
            console.log("Error fetching orders:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load orders."
            );
        } finally {
            setLoading(false);
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
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/v1/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Order deleted successfully!");

            fetchOrders();

        } catch (err) {
            console.log("Error deleting order:", err);

            alert(
                err.response?.data?.message ||
                "Failed to delete order"
            );
        }
    };

    // =========================
    // EDIT ORDER
    // =========================

    const editOrder = (id) => {
        navigate(`/editorder/${id}`);
    };

    // =========================
    // FORMAT AMOUNT
    // =========================

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN");
    };

    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =========================
    // STATUS CLASS
    // =========================

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "order-completed";

            case "pending":
                return "order-pending";

            case "cancelled":
                return "order-cancelled";

            case "processing":
                return "order-processing";

            default:
                return "order-default";
        }
    };

    // =========================
    // STATUS ICON
    // =========================

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "✓";

            case "pending":
                return "◷";

            case "cancelled":
                return "×";

            case "processing":
                return "↻";

            default:
                return "•";
        }
    };

    // =========================
    // ORDER STATISTICS
    // =========================

    const stats = useMemo(() => {

        const totalAmount = orders.reduce(
            (sum, item) =>
                sum + Number(item.total_amount || 0),
            0
        );

        const completed = orders.filter(
            (item) =>
                item.status?.toLowerCase() ===
                "completed"
        ).length;

        const pending = orders.filter(
            (item) =>
                item.status?.toLowerCase() ===
                "pending"
        ).length;

        const cancelled = orders.filter(
            (item) =>
                item.status?.toLowerCase() ===
                "cancelled"
        ).length;

        return {
            totalAmount,
            completed,
            pending,
            cancelled,
        };

    }, [orders]);

    // =========================
    // FILTER ORDERS
    // =========================

    const filteredOrders = useMemo(() => {

        return orders.filter((item) => {

            const searchText = `
                ${item.id}
                ${item.customer_id}
                ${item.total_amount}
                ${item.status}
            `.toLowerCase();

            const matchesSearch =
                searchText.includes(
                    search.toLowerCase()
                );

            const matchesStatus =
                statusFilter === "all" ||
                item.status?.toLowerCase() ===
                statusFilter.toLowerCase();

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    }, [orders, search, statusFilter]);

    return (
        <div className="orders-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="orders-header">

                <div className="orders-heading">

                    <div className="orders-heading-icon">
                        #
                    </div>

                    <div>

                        <span className="orders-eyebrow">
                            ORDER MANAGEMENT
                        </span>

                        <h1>Orders</h1>

                        <p>
                            Track and manage customer
                            orders from one place.
                        </p>

                    </div>

                </div>

                <div className="orders-header-actions">

                    <button
                        className="orders-refresh"
                        onClick={fetchOrders}
                        disabled={loading}
                    >
                        <span>↻</span>
                        Refresh
                    </button>

                    <button
                        className="orders-add"
                        onClick={() =>
                            navigate("/addorder")
                        }
                    >
                        <span>+</span>
                        Add Order
                    </button>

                </div>

            </div>

            {/* =========================
                ERROR
            ========================= */}

            {error && (
                <div className="orders-error">

                    <span>!</span>

                    <div>
                        <strong>
                            Unable to load orders
                        </strong>

                        <p>{error}</p>
                    </div>

                    <button onClick={fetchOrders}>
                        Try Again
                    </button>

                </div>
            )}

            {/* =========================
                STATISTICS
            ========================= */}

            <div className="orders-stats">

                <div className="order-stat total">

                    <div className="order-stat-top">

                        <span>Total Orders</span>

                        <div className="order-stat-icon">
                            #
                        </div>

                    </div>

                    <h2>{orders.length}</h2>

                    <p>
                        All customer orders
                    </p>

                </div>


                <div className="order-stat revenue">

                    <div className="order-stat-top">

                        <span>Total Value</span>

                        <div className="order-stat-icon">
                            ₹
                        </div>

                    </div>

                    <h2>
                        ₹{formatAmount(
                            stats.totalAmount
                        )}
                    </h2>

                    <p>
                        Combined order value
                    </p>

                </div>


                <div className="order-stat completed">

                    <div className="order-stat-top">

                        <span>Completed</span>

                        <div className="order-stat-icon">
                            ✓
                        </div>

                    </div>

                    <h2>
                        {stats.completed}
                    </h2>

                    <p>
                        Successfully completed
                    </p>

                </div>


                <div className="order-stat pending">

                    <div className="order-stat-top">

                        <span>Pending</span>

                        <div className="order-stat-icon">
                            ◷
                        </div>

                    </div>

                    <h2>
                        {stats.pending}
                    </h2>

                    <p>
                        Awaiting processing
                    </p>

                </div>

            </div>

            {/* =========================
                MAIN PANEL
            ========================= */}

            <div className="orders-panel">

                <div className="orders-panel-header">

                    <div>

                        <span className="orders-panel-label">
                            ORDER DIRECTORY
                        </span>

                        <h3>
                            Customer Orders
                        </h3>

                    </div>

                    <div className="orders-count">
                        {filteredOrders.length}
                        {" "}results
                    </div>

                </div>

                {/* =========================
                    FILTER TOOLBAR
                ========================= */}

                <div className="orders-toolbar">

                    <div className="orders-search">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search order or customer..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        {search && (
                            <button
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                ×
                            </button>
                        )}

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="all">
                            All Status
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="processing">
                            Processing
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>

                    </select>

                </div>

                {/* =========================
                    LOADING
                ========================= */}

                {loading ? (

                    <div className="orders-loading">

                        <div className="orders-spinner"></div>

                        <h4>
                            Loading orders
                        </h4>

                        <p>
                            Fetching order information...
                        </p>

                    </div>

                ) : filteredOrders.length === 0 ? (

                    /* =========================
                       EMPTY STATE
                    ========================= */

                    <div className="orders-empty">

                        <div className="orders-empty-icon">
                            #
                        </div>

                        <h4>
                            No orders found
                        </h4>

                        <p>
                            Try changing your search
                            or filter options.
                        </p>

                        {(search ||
                            statusFilter !== "all") && (

                            <button
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter(
                                        "all"
                                    );
                                }}
                            >
                                Clear Filters
                            </button>
                        )}

                    </div>

                ) : (

                    /* =========================
                       TABLE
                    ========================= */

                    <div className="orders-table-wrapper">

                        <table className="orders-table">

                            <thead>

                                <tr>

                                    <th>ORDER</th>

                                    <th>CUSTOMER</th>

                                    <th>AMOUNT</th>

                                    <th>STATUS</th>

                                    <th>ORDER DATE</th>

                                    <th>ACTIONS</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredOrders.map(
                                    (item) => (

                                        <tr
                                            key={item.id}
                                        >

                                            {/* ORDER */}

                                            <td>

                                                <div className="order-cell">

                                                    <div className="order-icon">
                                                        #
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            ORD-
                                                            {String(
                                                                item.id
                                                            ).padStart(
                                                                4,
                                                                "0"
                                                            )}
                                                        </strong>

                                                        <small>
                                                            Order ID #
                                                            {item.id}
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* CUSTOMER */}

                                            <td>

                                                <div className="customer-cell">

                                                    <div className="customer-avatar">
                                                        {String(
                                                            item.customer_id
                                                        ).charAt(
                                                            0
                                                        )}
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            Customer
                                                        </strong>

                                                        <small>
                                                            ID #
                                                            {
                                                                item.customer_id
                                                            }
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* AMOUNT */}

                                            <td>

                                                <strong className="order-amount">
                                                    ₹
                                                    {formatAmount(
                                                        item.total_amount
                                                    )}
                                                </strong>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`order-status ${getStatusClass(
                                                        item.status
                                                    )}`}
                                                >

                                                    <span>
                                                        {getStatusIcon(
                                                            item.status
                                                        )}
                                                    </span>

                                                    {item.status ||
                                                        "Unknown"}

                                                </span>

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                <span className="order-date">
                                                    {formatDate(
                                                        item.order_date
                                                    )}
                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="order-actions">

                                                    <button
                                                        className="edit-order"
                                                        onClick={() =>
                                                            editOrder(
                                                                item.id
                                                            )
                                                        }
                                                        title="Edit Order"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-order"
                                                        onClick={() =>
                                                            deleteOrder(
                                                                item.id
                                                            )
                                                        }
                                                        title="Delete Order"
                                                    >
                                                        Delete
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
    );
}