import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Payment() {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayment = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  // Format Amount
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // Format Date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Status Badge
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return "bg-success";

      case "pending":
        return "bg-warning text-dark";

      case "failed":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      <div className="container">

        {/* Header */}
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

              <div>
                <h2 className="fw-bold mb-1">
                  Payments
                </h2>

                <p className="text-muted mb-0">
                  Manage and view all payment transactions
                </p>
              </div>

              <div>
                <span className="badge bg-primary fs-6 px-3 py-2">
                  Total Payments: {payment.length}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Payment Table */}
        <div className="card border-0 shadow-sm">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h5 className="fw-bold mb-0">
                Payment List
              </h5>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={fetchPayment}
              >
                🔄 Refresh
              </button>

            </div>

            {/* Loading */}
            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

                <p className="text-muted mt-2 mb-0">
                  Loading payments...
                </p>

              </div>

            ) : payment.length === 0 ? (

              /* Empty State */
              <div className="text-center py-5">

                <div className="display-3 mb-3">
                  💳
                </div>

                <h5 className="fw-bold">
                  No Payments Found
                </h5>

                <p className="text-muted mb-0">
                  There are currently no payment transactions.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>
                      <th>Payment ID</th>
                      <th>Order ID</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Payment Date</th>
                    </tr>

                  </thead>

                  <tbody>

                    {payment.map((item) => (

                      <tr key={item.id}>

                        {/* Payment ID */}
                        <td>
                          <span className="badge bg-secondary">
                            #{item.id}
                          </span>
                        </td>

                        {/* Order ID */}
                        <td>
                          <span className="fw-semibold">
                            #{item.order_id}
                          </span>
                        </td>

                        {/* Amount */}
                        <td>
                          <span className="fw-bold text-success">
                            ₹{formatAmount(item.amount)}
                          </span>
                        </td>

                        {/* Payment Method */}
                        <td>
                          <span className="badge bg-info text-dark">
                            {item.payment_method || "N/A"}
                          </span>
                        </td>

                        {/* Status */}
                        <td>

                          <span
                            className={`badge ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status || "Unknown"}
                          </span>

                        </td>

                        {/* Date */}
                        <td>
                          {formatDate(item.payment_date)}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}