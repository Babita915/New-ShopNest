const db = require("../config/db");
const { faker } = require("@faker-js/faker");

const seedPayments = async () => {
  try {
    // Orders ki existing IDs lo
    const ordersResult = await db.query("SELECT id FROM orders");
    const orderIds = ordersResult.rows;

    // Har order ke liye ek hi payment
    for (const order of orderIds) {
      const payment_date = faker.date.recent({ days: 365 });

      const payment_method = faker.helpers.arrayElement([
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Cash on Delivery",
      ]);

      const amount = faker.number.float({
        min: 500,
        max: 10000,
        fractionDigits: 2,
      });

      const status = faker.helpers.arrayElement([
        "Pending",
        "Success",
        "Failed",
      ]);

      await db.query(
        `
        INSERT INTO payments
        (
          order_id,
          payment_date,
          payment_method,
          amount,
          status
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (order_id) DO NOTHING;
        `,
        [
          order.id,
          payment_date,
          payment_method,
          amount,
          status,
        ]
      );
    }

    console.log("✅ Payments Seeded Successfully");
  } catch (error) {
    console.error("❌ Error Seeding Payments:", error);
    throw error;
  }
};

module.exports = seedPayments;