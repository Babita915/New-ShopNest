import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddOrder() {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
    customer_id: "",
    ordee_date: "",
    total_amount: "",
    status: "",
  });

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };


    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/orders")
    }

    return ( 
        <>
        <div className="container mt-4">
            <h2>Add Order</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input type="number" name="customer Id" className="form-control" value={orderData.customer_id} onChange={handleChange} />
                   </div>

                    <div className="mb-3">
                        <label className="form-label">Total Amount</label>
                        <input type="number" name="totalAmount" className="form-control" value={orderData.total_amount} onChange={handleChange}/>
                    </div> 

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select name="status" className="form-control" value={orderData.status} onChange={handleChange} required>
                        <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
                    </select>
                 </div>

                 <button className="btn btn-primary">Add Order</button>
                 <button className="btn btn-secondary ms-2" onClick={() => navigate("/orders")}>Cancel</button>
            </form>
        </div>
        </>
    )
}