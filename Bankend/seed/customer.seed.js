const db = require("../config/db");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const seedCustomers = async () => {
  try {
    console.log("🌱 Starting Customer Seeding...");
    await db.query(`
  TRUNCATE TABLE customers RESTART IDENTITY CASCADE;
`);

    // ==========================================
    // 1. HASH PASSWORDS
    // ==========================================

    const userPlainPassword = "Password@123";
    const adminPlainPassword = "Admin@123";

    const userPassword = await bcrypt.hash(
      userPlainPassword,
      10
    );

    const adminPassword = await bcrypt.hash(
      adminPlainPassword,
      10
    );

    // ==========================================
    // 2. CREATE ADMIN
    // ==========================================

    await db.query(
      `
      INSERT INTO customers
      (
        name,
        email,
        password,
        phone,
        role
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        "ShopNest Admin",
        "admin@shopnest.com",
        adminPassword,
        "9876543210",
        "admin"
      ]
    );

    console.log("✅ Admin created successfully");

    // ==========================================
    // 3. CREATE 1000 NORMAL USERS
    // ==========================================

    for (let i = 0; i < 1000; i++) {

      const name = faker.person.fullName();

      // Unique email
      const email = `${faker.string.uuid()}@example.com`;

      // Unique phone
      const phone = faker.string.numeric(10);

      const city = faker.location.city();

      // Normal user
      const role = "user";

      await db.query(
        `
        INSERT INTO customers
        (
          name,
          email,
          password,
          phone,
          role,
          city
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          name,
          email,
          userPassword,
          phone,
          role,
          city
        ]
      );
    }

    console.log(
      "✅ 1000 Users Seeded Successfully"
    );

    console.log(
      "🔑 User Default Password: Password@123"
    );

    console.log(
      "👑 Admin Email: admin@shopnest.com"
    );

    console.log(
      "🔑 Admin Password: Admin@123"
    );

  } catch (error) {

    console.error(
      "❌ Error Seeding Customers:",
      error
    );

    throw error;
  }
};


// Export function
module.exports = seedCustomers;


// Allow direct execution
if (require.main === module) {

  seedCustomers()

    .then(() => {

      console.log(
        "✅ Customer seeding completed."
      );

      process.exit(0);

    })

    .catch((error) => {

      console.error(
        "❌ Customer seeding failed:",
        error
      );

      process.exit(1);
    });
}