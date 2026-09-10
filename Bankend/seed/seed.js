const seedCustomers = require("./customer.seed");
const seedCategories = require("./categories.seed");
const seedProducts = require("./product.seed");
const seedInventory = require("./inventory.seed");
const seedOrders = require("./orders.seed");
const seedOrderItems = require("./order_items.seed");
const seedPayments = require("./payment.seed");

const seedDatabase = async () => {
  try {
    await seedCustomers();
    await seedCategories();
    await seedProducts();
    await seedInventory();
    await seedOrders();
    await seedOrderItems();
    await seedPayments();

    console.log("✅ Database Seeded Successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error Seeding Database:", error);
    process.exit(1);
  }
};

seedDatabase();