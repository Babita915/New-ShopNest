import React, { useEffect, useState } from "react";
import { getTopProducts } from "../service/Service";

export default function TopProductsTable() {
    const [topProduct, setTopProduct] = useState([]);


    const fetchTopProducts = async () => {
        try {
            const response = await getTopProducts();
            setTopProduct(response.data);
        } catch(error){
            console.log("Top Products Error:", error)
        }
    }

    useEffect(() => {
        fetchTopProducts();
    }, []);

    return (
        <>
        <h2>Top Products</h2>
        <pre>{JSON.stringify(topProduct, null, 2)}</pre>
        </>
    )
}