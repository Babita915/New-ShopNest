import React, { useEffect, useState } from "react";
import { getHighestOrders } from "../service/Service";

export default function Analytics() {
    const [highestOrders, setHighestOrders] = useState(null);

    const fetchHighestOrders = async () => {
        try {
            const response = await getHighestOrders();
            setHighestOrders(response.data)
        } catch(error) {
            console.error("Highest Orders Error:", error)
        }
    }

    useEffect(() => {
        fetchHighestOrders();
    }, [])
    
    return (
        <>
        <h2>Highest Orders</h2>
        <pre>{JSON.stringify(highestOrders, null, 2)}</pre>
        </>
    )
}