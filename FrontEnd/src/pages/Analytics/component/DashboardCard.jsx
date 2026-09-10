import React, { useEffect, useState } from "react";
import { getDashboard } from "../service/Service";

export default function DashboardCard() {
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(dashboard, null, 2)}</pre>
    </>
  );
}