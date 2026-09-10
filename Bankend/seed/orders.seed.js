const db = require("../config/db");
const { faker } = require("@faker-js/faker");

const seedOrders = async () => {
  try {
    for (let i = 0; i < 500; i++) {
      const customer_id = faker.number.int({ min: 1, max: 100 });
      const order_date = faker.date.recent({ days: 365 });
      const total_amount = faker.number.float({
        min: 500,
        max: 10000,
        fractionDigits: 2,
      });

      const status = faker.helpers.arrayElement([
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ]);

      await db.query(
        `
        INSERT INTO orders
        (
          customer_id,
          order_date,
          total_amount,
          status
        )
        VALUES
        ($1, $2, $3, $4)
        `,
        [customer_id, order_date, total_amount, status]
      );
    }

    console.log("✅ Orders Seeded Successfully");
  } catch (error) {
    console.error("❌ Error Seeding Orders:", error);
    throw error;
  }
};

module.exports = seedOrders;