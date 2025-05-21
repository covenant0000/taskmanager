require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_WqX9pg7JYiHe@ep-green-term-a8hmodit-pooler.eastus2.azure.neon.tech/taskmanager?sslmode=require",
  host: process.env.PGHOST || "ep-green-term-a8hmodit-pooler.eastus2.azure.neon.tech",
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || "neondb_owner",
  password: process.env.PGPASSWORD || "npg_WqX9pg7JYiHe",
  database: process.env.PGDATABASE || "taskmanager",
};