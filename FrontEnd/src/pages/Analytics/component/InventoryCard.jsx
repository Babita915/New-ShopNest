import React, { useEffect, useState } from "react";
import { getLowStockProducts, getOutOfStockProducts } from "../service/Service";

export default function InventoryCard() {
    const [lowStock, setLowStock] = useState([]);
    const [outOfStock, setOutOfStock] = useState([]);

    const fetchInventory = async () => {
        try {
            const lowStockres = await getLowStockProducts();
            const outOfStockres = await getOutOfStockProducts();

            setLowStock(lowStockres.data);
            setOutOfStock(outOfStockres.data)
        } catch(error) {
            console.error("Inventory Error:", error)
        }
    }

    useEffect(() => {
        fetchInventory()
    }, [])
    return (
        <>
        <h2>Inventory</h2>
        <h3>Low Stock Products</h3>
        <pre>{JSON.stringify(lowStock, null, 2)}</pre>

        <h3>Out of Stock Products</h3>
        <pre>{JSON.stringify(outOfStock, null, 2)}</pre>
        </>
    )
}