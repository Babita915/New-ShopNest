import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "../style/payment.css";

export default function Payment() {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [error, setError] = useState("");

  const fetchPayment = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/v1/payment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment Data:", res.data);

      setPayment(
        Array.isArray(res.data.data)
          ? res.data.data
          : []
      );
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Unable to load payment data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  // -------------------------
  // Format Amount
  // -------------------------
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // -------------------------
  // Format Date
  // -------------------------
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

  // -------------------------
  // Format Payment Method
  // -------------------------
  const formatMethod = (method) => {
    if (!method) return "N/A";

    return method
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // -------------------------
  // Status Class
  // -------------------------
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return "payment-success";

      case "pending":
        return "payment-pending";

      case "failed":
        return "payment-failed";

      default:
        return "payment-unknown";
    }
  };

  // -------------------------
  // Status Icon
  // -------------------------
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return "✓";

      case "pending":
        return "◷";

      case "failed":
        return "×";

      default:
        return "•";
    }
  };

  // -------------------------
  // Payment Methods
  // -------------------------
  const paymentMethods = useMemo(() => {
    const methods = payment
      .map((item) => item.payment_method)
      .filter(Boolean);

    return [...new Set(methods)];
  }, [payment]);

  // -------------------------
  // Statistics
  // -------------------------
  const stats = useMemo(() => {
    const totalAmount = payment.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

    const successful = payment.filter(
      (item) =>
        ["success", "completed"].includes(
          item.status?.toLowerCase()
        )
    ).length;

    const pending = payment.filter(
      (item) =>
        item.status?.toLowerCase() === "pending"
    ).length;

    const failed = payment.filter(
      (item) =>
        item.status?.toLowerCase() === "failed"
    ).length;

    return {
      totalAmount,
      successful,
      pending,
      failed,
    };
  }, [payment]);

  // -------------------------
  // Filter Payments
  // -------------------------
  const filteredPayments = useMemo(() => {
    return payment.filter((item) => {
      const searchText =
        `${item.id} ${item.order_id} ${item.payment_method} ${item.status}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        item.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      const matchesMethod =
        methodFilter === "all" ||
        item.payment_method === methodFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod
      );
    });
  }, [
    payment,
    search,
    statusFilter,
    methodFilter,
  ]);

  return (
    <div className="payment-page">

      {/* ================= HEADER ================= */}

      <div className="payment-header">

        <div className="payment-heading">

          <div className="payment-heading-icon">
            ₹
          </div>

          <div>
            <span className="payment-eyebrow">
              TRANSACTION MANAGEMENT
            </span>

            <h1>Payments</h1>

            <p>
              Track and manage all payment
              transactions from one place.
            </p>
          </div>

        </div>

        <button
          className="payment-refresh"
          onClick={fetchPayment}
          disabled={loading}
        >
          <span>↻</span>
          Refresh
        </button>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="payment-error">
          <span>!</span>
          <div>
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>

          <button onClick={fetchPayment}>
            Try Again
          </button>
        </div>
      )}

      {/* ================= STATISTICS ================= */}

      <div className="payment-stats">

        <div className="payment-stat total">
          <div className="stat-top">
            <span>Total Transactions</span>
            <div className="stat-icon">
              ₹
            </div>
          </div>

          <h2>{payment.length}</h2>

          <p>
            All recorded payments
          </p>
        </div>

        <div className="payment-stat revenue">
          <div className="stat-top">
            <span>Total Revenue</span>
            <div className="stat-icon">
              ₹
            </div>
          </div>

          <h2>
            ₹{formatAmount(stats.totalAmount)}
          </h2>

          <p>
            Transaction value
          </p>
        </div>

        <div className="payment-stat success">
          <div className="stat-top">
            <span>Successful</span>
            <div className="stat-icon">
              ✓
            </div>
          </div>

          <h2>{stats.successful}</h2>

          <p>
            Completed transactions
          </p>
        </div>

        <div className="payment-stat pending">
          <div className="stat-top">
            <span>Pending</span>
            <div className="stat-icon">
              ◷
            </div>
          </div>

          <h2>{stats.pending}</h2>

          <p>
            Awaiting confirmation
          </p>
        </div>

      </div>

      {/* ================= DIRECTORY ================= */}

      <div className="payment-panel">

        <div className="payment-panel-header">

          <div>
            <span className="panel-label">
              PAYMENT DIRECTORY
            </span>

            <h3>
              Recent Transactions
            </h3>
          </div>

          <div className="transaction-count">
            {filteredPayments.length} results
          </div>

        </div>

        {/* ================= FILTER BAR ================= */}

        <div className="payment-toolbar">

          <div className="payment-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search payment, order, method..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">
              All Status
            </option>

            <option value="success">
              Success
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="failed">
              Failed
            </option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) =>
              setMethodFilter(e.target.value)
            }
          >
            <option value="all">
              All Methods
            </option>

            {paymentMethods.map((method) => (
              <option
                key={method}
                value={method}
              >
                {formatMethod(method)}
              </option>
            ))}
          </select>

        </div>

        {/* ================= CONTENT ================= */}

        {loading ? (

          <div className="payment-loading">

            <div className="loading-circle"></div>

            <h4>Loading payments</h4>

            <p>
              Fetching transaction information...
            </p>

          </div>

        ) : filteredPayments.length === 0 ? (

          <div className="payment-empty">

            <div className="empty-icon">
              ₹
            </div>

            <h4>
              No transactions found
            </h4>

            <p>
              Try changing your search or
              filter options.
            </p>

            {(search ||
              statusFilter !== "all" ||
              methodFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setMethodFilter("all");
                }}
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="payment-table-wrapper">

            <table className="payment-table">

              <thead>
                <tr>
                  <th>TRANSACTION</th>
                  <th>ORDER</th>
                  <th>AMOUNT</th>
                  <th>METHOD</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>

              <tbody>

                {filteredPayments.map(
                  (item) => (

                    <tr key={item.id}>

                      {/* Transaction */}

                      <td>

                        <div className="transaction-cell">

                          <div className="transaction-icon">
                            ₹
                          </div>

                          <div>
                            <strong>
                              PAY-
                              {String(item.id)
                                .padStart(4, "0")}
                            </strong>

                            <small>
                              Payment ID #{item.id}
                            </small>
                          </div>

                        </div>

                      </td>

                      {/* Order */}

                      <td>

                        <span className="order-number">
                          #{item.order_id}
                        </span>

                      </td>

                      {/* Amount */}

                      <td>

                        <strong className="payment-amount">
                          ₹{formatAmount(item.amount)}
                        </strong>

                      </td>

                      {/* Method */}

                      <td>

                        <span className="method-badge">
                          {formatMethod(
                            item.payment_method
                          )}
                        </span>

                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
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

                      {/* Date */}

                      <td>

                        <div className="date-cell">
                          {formatDate(
                            item.payment_date
                          )}
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