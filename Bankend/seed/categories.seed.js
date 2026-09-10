const pool = require("../config/db");

const seedCategories = async () => {
  try {
    const categories = [
      "Electronics",
      "Fashion",
      "Books",
      "Sports",
      "Home & Kitchen",
      "Beauty",
      "Toys",
      "Grocery",
      "Furniture",
      "Automotive"
    ];

    for (const category of categories) {
      await pool.query(
        `
        INSERT INTO categories(name)
        VALUES($1)
        ON CONFLICT (name) DO NOTHING
        `,
        [category]
      );
    }

    console.log("✅ Categories Seeded Successfully");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

module.exports = seedCategories;