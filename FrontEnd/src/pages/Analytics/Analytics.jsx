import React from "react";

import DashboardCards from "./component/DashboardCard";
import RevenueChart from "./component/RevenueChart";
import TopProductsTable from "./component/TopProductsTable";
import TopCustomersTable from "./component/TopCustomersTable";
import InventoryCard from "./component/InventoryCard";
import PaymentSummary from "./component/PaymentSummary";
import HighestOrders from "./component/HighestOrders";
import RepeatCustomers from "./component/RepeatCustomers";
import OrderDetails from "./component/OrderDetails";

const Analytics = () => {
  return (
    <>
      {/* ===========================
          PAGE CSS
      =========================== */}

      <style>{`
        /* ===========================
           Analytics Page
        =========================== */

        .analytics-page {
          min-height: 100vh;
          padding: 30px;
          background: #f8fafc;
          color: #0f172a;
          box-sizing: border-box;
        }


        /* ===========================
           Header
        =========================== */

        .analytics-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .analytics-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 7px;
        }

        .analytics-header h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
        }

        .analytics-header p {
          margin: 8px 0 0;
          color: #64748b;
          font-size: 14px;
        }

        .analytics-admin {
          padding: 9px 15px;
          border-radius: 20px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #1d4ed8;
          font-size: 13px;
          font-weight: 700;
        }

        .analytics-admin span {
          color: #22c55e;
          font-size: 9px;
          margin-right: 6px;
        }


        /* ===========================
           Overview
        =========================== */

        .analytics-overview {
          display: flex;
          align-items: center;
          justify-content: space-between;

          background: linear-gradient(
            135deg,
            #0f172a,
            #1e3a8a
          );

          color: white;
          padding: 22px 25px;
          border-radius: 15px;
          margin-bottom: 22px;

          box-shadow:
            0 8px 25px rgba(15, 23, 42, 0.12);

          box-sizing: border-box;
        }

        .analytics-overview h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }

        .analytics-overview p {
          margin: 5px 0 0;
          color: #cbd5e1;
          font-size: 12px;
        }

        .live-status {
          padding: 7px 12px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          color: #86efac;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }


        /* ===========================
           Dashboard Cards
        =========================== */

        .analytics-card-wrapper {
          margin-bottom: 25px;
        }


        /* ===========================
           Grid
        =========================== */

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .revenue-grid {
          grid-template-columns: 1.6fr 1fr;
        }


        /* ===========================
           Analytics Box
        =========================== */

        .analytics-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          overflow: hidden;

          box-shadow:
            0 5px 18px rgba(15, 23, 42, 0.05);

          margin-bottom: 20px;
          transition: 0.25s ease;

          min-width: 0;
        }

        .analytics-box:hover {
          box-shadow:
            0 10px 25px rgba(15, 23, 42, 0.08);
        }

        .full-width {
          width: 100%;
          box-sizing: border-box;
        }


        /* ===========================
           Box Header
        =========================== */

        .analytics-box-header {
          min-height: 75px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 17px 20px;

          border-bottom: 1px solid #e2e8f0;
          background: #ffffff;

          box-sizing: border-box;
        }

        .analytics-box-header > div {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .analytics-box-header > div > span {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #eff6ff;
          border-radius: 10px;

          font-size: 19px;
          flex-shrink: 0;
        }

        .analytics-box-header h3 {
          margin: 0;
          color: #1e293b;
          font-size: 15px;
          font-weight: 700;
        }

        .analytics-box-header p {
          margin: 4px 0 0;
          color: #94a3b8;
          font-size: 11px;
        }

        .box-badge {
          padding: 6px 10px;

          background: #f1f5f9;
          color: #64748b;

          border-radius: 6px;

          font-size: 10px;
          font-weight: 700;

          white-space: nowrap;
        }


        /* ===========================
           Box Body
        =========================== */

        .analytics-box-body {
          padding: 20px;
          overflow-x: auto;
          box-sizing: border-box;
        }


        /* ===========================
           Footer Note
        =========================== */

        .analytics-note {
          text-align: center;
          padding: 10px 0 25px;

          color: #94a3b8;
          font-size: 12px;
        }


        /* ===========================
           Tablet
        =========================== */

        @media (max-width: 1000px) {

          .analytics-grid,
          .revenue-grid {
            grid-template-columns: 1fr;
          }

        }


        /* ===========================
           Mobile
        =========================== */

        @media (max-width: 700px) {

          .analytics-page {
            padding: 20px 15px;
          }

          .analytics-header {
            flex-direction: column;
            gap: 15px;
          }

          .analytics-header h1 {
            font-size: 24px;
          }

          .analytics-header p {
            font-size: 13px;
          }

          .analytics-overview {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .analytics-box-header {
            padding: 14px;
          }

          .analytics-box-body {
            padding: 14px;
          }

          .analytics-box-header h3 {
            font-size: 14px;
          }

          .analytics-box-header p {
            font-size: 10px;
          }

          .box-badge {
            display: none;
          }

        }


        /* ===========================
           Very Small Screen
        =========================== */

        @media (max-width: 450px) {

          .analytics-page {
            padding: 15px 10px;
          }

          .analytics-header h1 {
            font-size: 21px;
          }

          .analytics-label {
            font-size: 10px;
          }

          .analytics-overview {
            padding: 18px;
          }

          .analytics-overview h3 {
            font-size: 16px;
          }

          .analytics-box-header > div {
            gap: 8px;
          }

          .analytics-box-header > div > span {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

        }

      `}</style>


      {/* ===========================
          ANALYTICS PAGE
      =========================== */}

      <div className="analytics-page">

        {/* ===========================
            HEADER
        =========================== */}

        <div className="analytics-header">

          <div>

            <div className="analytics-label">
              📊 BUSINESS INSIGHTS
            </div>

            <h1>
              Analytics Dashboard
            </h1>

            <p>
              Monitor your store performance and understand
              your business insights.
            </p>

          </div>


          <div className="analytics-admin">
            <span>●</span>
            Admin
          </div>

        </div>


        {/* ===========================
            OVERVIEW
        =========================== */}

        <div className="analytics-overview">

          <div>

            <h3>
              Store Performance
            </h3>

            <p>
              A complete overview of your e-commerce business
            </p>

          </div>

          <span className="live-status">
            ● Live Data
          </span>

        </div>


        {/* ===========================
            DASHBOARD CARDS
        =========================== */}

        <div className="analytics-card-wrapper">
          <DashboardCards />
        </div>


        {/* ===========================
            REVENUE + PAYMENT
        =========================== */}

        <div className="analytics-grid revenue-grid">

          {/* Revenue */}

          <div className="analytics-box">

            <div className="analytics-box-header">

              <div>

                <span>
                  📈
                </span>

                <div>

                  <h3>
                    Monthly Revenue
                  </h3>

                  <p>
                    Revenue performance over time
                  </p>

                </div>

              </div>

              <span className="box-badge">
                Revenue
              </span>

            </div>


            <div className="analytics-box-body">
              <RevenueChart />
            </div>

          </div>


          {/* Payment */}

          <div className="analytics-box">

            <div className="analytics-box-header">

              <div>

                <span>
                  💳
                </span>

                <div>

                  <h3>
                    Payment Summary
                  </h3>

                  <p>
                    Payment transaction overview
                  </p>

                </div>

              </div>

            </div>


            <div className="analytics-box-body">
              <PaymentSummary />
            </div>

          </div>

        </div>


        {/* ===========================
            PRODUCTS + CUSTOMERS
        =========================== */}

        <div className="analytics-grid">

          {/* Top Products */}

          <div className="analytics-box">

            <div className="analytics-box-header">

              <div>

                <span>
                  🛒
                </span>

                <div>

                  <h3>
                    Top Products
                  </h3>

                  <p>
                    Best performing products
                  </p>

                </div>

              </div>

              <span className="box-badge">
                Products
              </span>

            </div>


            <div className="analytics-box-body">
              <TopProductsTable />
            </div>

          </div>


          {/* Top Customers */}

          <div className="analytics-box">

            <div className="analytics-box-header">

              <div>

                <span>
                  👥
                </span>

                <div>

                  <h3>
                    Top Customers
                  </h3>

                  <p>
                    Your most valuable customers
                  </p>

                </div>

              </div>

              <span className="box-badge">
                Customers
              </span>

            </div>


            <div className="analytics-box-body">
              <TopCustomersTable />
            </div>

          </div>

        </div>


        {/* ===========================
            INVENTORY
        =========================== */}

        <div className="analytics-box full-width">

          <div className="analytics-box-header">

            <div>

              <span>
                📦
              </span>

              <div>

                <h3>
                  Inventory Status
                </h3>

                <p>
                  Monitor your current product stock
                </p>

              </div>

            </div>

            <span className="box-badge">
              Inventory
            </span>

          </div>


          <div className="analytics-box-body">
            <InventoryCard />
          </div>

        </div>


        {/* ===========================
            ORDERS
        =========================== */}

        <div className="analytics-grid">

          {/* Highest Orders */}

          <div className="analytics-box">

            <div className="analytics-box-header">

              <div>

                <span>
                  🏆
                </span>

                <div>

                  <h3>
                    Highest Orders
                  </h3>

                  <p>
                    Orders with highest value
                  </p>

                </div>

              </div>

            </div>


            <div className="analytics-box-body">
              <HighestOrders />
            </div>

          </div>


          {/* Repeat Customers */}

          <div className="analytics-box">

            <div className="analytics-box-header">

              <div>

                <span>
                  🔁
                </span>

                <div>

                  <h3>
                    Repeat Customers
                  </h3>

                  <p>
                    Customers who shop repeatedly
                  </p>

                </div>

              </div>

            </div>


            <div className="analytics-box-body">
              <RepeatCustomers />
            </div>

          </div>

        </div>


        {/* ===========================
            ORDER DETAILS
        =========================== */}

        <div className="analytics-box full-width">

          <div className="analytics-box-header">

            <div>

              <span>
                📋
              </span>

              <div>

                <h3>
                  Order Details
                </h3>

                <p>
                  Detailed overview of customer orders
                </p>

              </div>

            </div>

            <span className="box-badge">
              Orders
            </span>

          </div>


          <div className="analytics-box-body">
            <OrderDetails />
          </div>

        </div>


        {/* ===========================
            FOOTER NOTE
        =========================== */}

        <div className="analytics-note">
          ✨ ShopNest Analytics — Make better decisions
          with your store data.
        </div>

      </div>
    </>
  );
};

export default Analytics;