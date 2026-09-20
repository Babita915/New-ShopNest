import React, { useEffect, useState } from "react";
import { getRepeatCustomers } from "../service/Service";

export default function RepeatCustomers() {
    const [repeatCustomers, setRepeatCustomers] = useState(null);

    const fetchRepeatCustomers = async () => {
        try {
            const response = await getRepeatCustomers();
            setRepeatCustomers(response.data)
        } catch(error) {
            console.error("Repeat Customers Error:", error)
        }
    }

    useEffect(() => {
        fetchRepeatCustomers();
    }, [])
    
    return (
        <>
        <h2>Repeat Customers</h2>
        <pre>{JSON.stringify(repeatCustomers, null, 2)}</pre>
        </>
    )
}