import React, { useEffect, useState } from "react";
import { getPaymentSummary } from "../service/Service";

export default function Analytics() {
    const [paymentSummary, setPaymentSummary] = useState(null);

    const fetchPaymentSummary = async () => {
        try {
            const response = await getPaymentSummary();
            setPaymentSummary(response.data)
        } catch(error) {
            console.error("Payment Summary Error:", error)
        }
    }

    useEffect(() => {
        fetchPaymentSummary();
    }, [])
    return (
        <>
        <h2>Payment Summary</h2>
        <pre>{JSON.stringify(paymentSummary, null, 2)}</pre>
        </>
    )
}