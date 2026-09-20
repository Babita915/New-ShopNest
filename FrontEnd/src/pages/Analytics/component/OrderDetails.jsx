import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../service/Service";

export default function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState([]);
    
    const fetchOrderDetails = async () => {
  try {
    const orderDetailsResponse = await getOrderDetails(1);
    setOrderDetails(orderDetailsResponse.data);
  } catch (error) {
    console.error("Order Details Error:", error);
  }
};

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <>
        <h2>Order Details</h2>
        <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
        </>
    )
}