const db = require("../config/db");

const seedProducts = async () => {
  try {
    console.log("🌱 Starting Product Seeding...");

    // Get actual category IDs
    const categoryResult = await db.query(
      "SELECT id FROM categories ORDER BY id"
    );

    const categories = categoryResult.rows;

    if (categories.length === 0) {
      throw new Error(
        "No categories found. Please seed categories first."
      );
    }

    // Fetch products from DummyJSON
    const response = await fetch(
      "https://dummyjson.com/products?limit=100"
    );

    const data = await response.json();

    const products = data.products;

    if (!products || products.length === 0) {
      throw new Error("No products found from API.");
    }

    // Insert products
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      // Random category from your database
      const randomCategory =
        categories[
          Math.floor(Math.random() * categories.length)
        ];

      const category_id = randomCategory.id;

      const name = product.title;

      const description = product.description;

      const price = product.price;

      const image = product.thumbnail;

      console.log(
        `${i + 1}. ${name} → ${image}`
      );

      await db.query(
        `
        INSERT INTO products
        (
          category_id,
          name,
          description,
          price,
          image
        )
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          category_id,
          name,
          description,
          price,
          image
        ]
      );
    }

    console.log(
      `✅ ${products.length} Products Seeded Successfully`
    );

  } catch (error) {
    console.error(
      "❌ Error Seeding Products:",
      error
    );

    throw error;
  }
};

module.exports = seedProducts;

// Allow direct execution
if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log(
        "✅ Product seeding completed."
      );

      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}