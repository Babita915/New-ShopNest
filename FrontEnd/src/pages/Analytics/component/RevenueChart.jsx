import React, { useEffect, useState } from "react";
import { getMonthlyRevenue } from "../service/Service";

export default function RevenueChart() {
    const [revenueChart, setRevenueChart] = useState(null);

    const fetchRevenueChart = async() => {
        try {
            const response = await getMonthlyRevenue();
            setRevenueChart(response.data)
        } catch(error) {
            console.error("Revenue Chart Error:", error)
        }
    }

    useEffect(() => {
        fetchRevenueChart();
    }, [])
    return (
        <>
        <h2>Revenue Chart</h2>
        <pre>{JSON.stringify(revenueChart, null, 2)}</pre>
        </>
    )
}