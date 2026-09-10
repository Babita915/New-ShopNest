import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrder() {
    const [order, setOrder] = useState({
  customer_id: "",
  order_date: "",
  total_amount: "",
  status: "",
});
    const { id } = useParams();
    const navigate = useNavigate();

  const fetchOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/v1/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    setOrder(res.data.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

   useEffect(() => {
    if (id) {
        fetchOrder(id);
    }
}, [id]);

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value,
        });
    };


    const updateOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `http://localhost:5000/api/v1/orders/${id}`,
                order,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log(res.data)
            alert("Order Update Successfully")
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("Update Failed");
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow p-4">
                    <h2 className="text-center mb-4">Edit Order</h2>

                    <form onSubmit={updateOrder}>
                        <div className="mb-3">
                            <label className="form-label">Customer Id</label>
                            <input type="number" name="customer_id" className="form-control" value={order.customer_id || ""} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Total Amount</label>
                            <input type="number" name="total_amount" className="form-control" value={order.total_amount || ""} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Order Date</label>
                            <input type="date" name="order_date" className="form-control" value={order.order_date || ""} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Status
                            </label>

                            <select
                                name="status"
                                className="form-select"
                                value={order.status || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Order
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate("/orders")}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}