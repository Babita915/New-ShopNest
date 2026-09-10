const db = require("../config/db");
const { faker } = require("@faker-js/faker");

const seedInventory = async () => {
  try {
    // Products table se actual IDs nikalo
    const result = await db.query(
      "SELECT id FROM products ORDER BY id"
    );

    const products = result.rows;

    console.log(`📦 Products Found: ${products.length}`);

    if (products.length === 0) {
      throw new Error(
        "❌ No products found. Please seed products first."
      );
    }

    let insertedCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      const stock = faker.number.int({
        min: 10,
        max: 500,
      });

      const inventoryResult = await db.query(
        `
        INSERT INTO inventory (product_id, stock)
        VALUES ($1, $2)
        ON CONFLICT (product_id) DO NOTHING
        RETURNING id;
        `,
        [product.id, stock]
      );

      if (inventoryResult.rowCount > 0) {
        insertedCount++;
      } else {
        skippedCount++;
      }
    }

    console.log(`✅ Inventory Inserted: ${insertedCount}`);
    console.log(`⚠️ Inventory Skipped: ${skippedCount}`);
    console.log("✅ Inventory Seeding Completed");

  } catch (error) {
    console.error("❌ Error Seeding Inventory:", error);
    throw error;
  }
};

module.exports = seedInventory;
