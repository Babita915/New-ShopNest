import React, { useEffect, useState } from "react";
import { getTopCustomers } from "../service/Service";

export default function TopCustomersTable() {
    const [topCustomers, setTopCustomers] = useState([]);

    const fetchTopCustomers = async () => {
        try {
            const response = await getTopCustomers();
            setTopCustomers(response.data);
        } catch(error) {
            console.error("Top Customers Error:", error);
        }
    }

    useEffect(() => {
        fetchTopCustomers();
    }, [])
    return (
        <>
        <h2>Top Customers</h2>
        <pre>{JSON.stringify(topCustomers, null, 2)}</pre>
        </>
    )
}
