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
    <div className="bg-light min-vh-100">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">

          <span className="navbar-brand fw-bold fs-4">
            📊 Analytics Dashboard
          </span>

          <span className="text-white fw-semibold">
            Welcome Admin 👋
          </span>

        </div>
      </nav>


      {/* ================= MAIN CONTENT ================= */}
      <div className="container py-4">

        {/* Page Heading */}
        <div className="mb-4">

          <h2 className="fw-bold mb-1">
            Business Analytics
          </h2>

          <p className="text-muted mb-0">
            Monitor your store performance and business insights
          </p>

        </div>


        {/* ================= DASHBOARD CARDS ================= */}
        <div className="mb-4">
          <DashboardCards />
        </div>


        {/* ================= REVENUE + PAYMENT ================= */}
        <div className="row g-4 mb-4">

          {/* Revenue */}
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-header bg-primary text-white py-3">
                <h5 className="mb-0 fw-bold">
                  📈 Monthly Revenue
                </h5>
              </div>

              <div className="card-body">
                <RevenueChart />
              </div>

            </div>

          </div>


          {/* Payment */}
          <div className="col-lg-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-header bg-success text-white py-3">
                <h5 className="mb-0 fw-bold">
                  💳 Payment Summary
                </h5>
              </div>

              <div className="card-body">
                <PaymentSummary />
              </div>

            </div>

          </div>

        </div>


        {/* ================= PRODUCTS + CUSTOMERS ================= */}
        <div className="row g-4 mb-4">

          {/* Top Products */}
          <div className="col-lg-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-header bg-info text-white py-3">
                <h5 className="mb-0 fw-bold">
                  🛒 Top Products
                </h5>
              </div>

              <div className="card-body">
                <TopProductsTable />
              </div>

            </div>

          </div>


          {/* Top Customers */}
          <div className="col-lg-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-header bg-warning text-dark py-3">
                <h5 className="mb-0 fw-bold">
                  👥 Top Customers
                </h5>
              </div>

              <div className="card-body">
                <TopCustomersTable />
              </div>

            </div>

          </div>

        </div>


        {/* ================= INVENTORY ================= */}
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-header bg-danger text-white py-3">

            <h5 className="mb-0 fw-bold">
              📦 Inventory Status
            </h5>

          </div>

          <div className="card-body">
            <InventoryCard />
          </div>

        </div>


        {/* ================= ORDERS ================= */}
        <div className="row g-4 mb-4">

          {/* Highest Orders */}
          <div className="col-lg-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-header bg-secondary text-white py-3">

                <h5 className="mb-0 fw-bold">
                  🏆 Highest Orders
                </h5>

              </div>

              <div className="card-body">
                <HighestOrders />
              </div>

            </div>

          </div>


          {/* Repeat Customers */}
          <div className="col-lg-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-header bg-dark text-white py-3">

                <h5 className="mb-0 fw-bold">
                  🔁 Repeat Customers
                </h5>

              </div>

              <div className="card-body">
                <RepeatCustomers />
              </div>

            </div>

          </div>

        </div>


        {/* ================= ORDER DETAILS ================= */}
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-header bg-primary text-white py-3">

            <h5 className="mb-0 fw-bold">
              📋 Order Details
            </h5>

          </div>

          <div className="card-body">

            <OrderDetails />

          </div>

        </div>


        {/* ================= FOOTER ================= */}
        <div className="text-center text-muted py-3">

          <small>
            © 2026 E-Commerce Analytics Dashboard
          </small>

        </div>

      </div>

    </div>
  );
};

export default Analytics;