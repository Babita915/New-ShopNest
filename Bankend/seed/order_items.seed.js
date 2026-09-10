const db = require("../config/db");
const { faker } = require("@faker-js/faker");

const seedOrderItems = async () => {
  try {
    // Existing Orders
    const ordersResult = await db.query("SELECT id FROM orders");
    const orderIds = ordersResult.rows;

    // Existing Products
    const productsResult = await db.query("SELECT id FROM products");
    const productIds = productsResult.rows;

    for (let i = 0; i < 1500; i++) {
      const order_id = faker.helpers.arrayElement(orderIds).id;
      const product_id = faker.helpers.arrayElement(productIds).id;

      const quantity = faker.number.int({
        min: 1,
        max: 5,
      });

      const price = faker.number.float({
        min: 100,
        max: 5000,
        fractionDigits: 2,
      });

      await db.query(
        `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [order_id, product_id, quantity, price]
      );
    }

    console.log("✅ Order Items Seeded Successfully");
  } catch (error) {
    console.error("❌ Error Seeding Order Items:", error);
    throw error;
  }
};

module.exports = seedOrderItems;