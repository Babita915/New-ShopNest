import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditCustomer() {
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate();
    const {id} = useParams();
    console.log("Customer ID:", id);

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/v1/customers/${id}`)
        .then((res) => {
            console.log("Response:", res.data);
            setCustomer(res.data.data)
        })
        .catch((err) => console.log(err))
    }, [id])

    const updateCustomer = async () => {
    try {
        const res = await axios.put(
            `http://localhost:5000/api/v1/customers/${id}`,
            customer
        );

        console.log("Update Response:", res.data);

        alert("Customer Updated Successfully");

        navigate("/customer");
    } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("Message:", err.message);

    alert("Update Failed");
}
};
    return (
        <>
        <div className="container mt-5">
            <div className="card  shadow p-4">
                <h2 className="text-center mb-4">
                    Edit Customer
                </h2>

                <input
    type="text"
    className="form-control"
    value={customer.name || ""}
    onChange={(e) =>
        setCustomer({ ...customer, name: e.target.value })
    }
/>
 <br/><br/>
<input type="text" className="form-control" value={customer.email || ""} onChange={(e) => setCustomer({...customer, email:e.target.value})} />
<br/><br/>
<input type="text" className="form-control" value={customer.phone || ""} onChange={(e) => setCustomer({...customer, phone:e.target.value})} />
<br/><br/>
<input type="text" className="form-control" value={customer.city || ""} onChange={(e) => setCustomer({...customer, city:e.target.value})} />
<br/><br/>
<input type="text" className="form-control" value={customer.role || ""} onChange={(e) => setCustomer({...customer, role:e.target.value})} />
<br/><br/>
<button
    className="btn btn-primary mt-3"
    onClick={updateCustomer}
>
    Update Customer
</button>
            </div>
        </div>
        </>
    )
}