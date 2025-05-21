// // {
// //   "development": {
// //     "username": "neondb_owner",
// //     "password": "npg_WqX9pg7JYiHe",
// //     "database": "taskmanager",
// //     "host": "ep-green-term-a8hmodit-pooler.eastus2.azure.neon.tech",
// //     "port": 5432,
// //     "dialect": "postgres"
// //   },
// //   "test": {
// //     "username": "neondb_owner",
// //     "password": "npg_WqX9pg7JYiHe",
// //     "database": "taskmanager_test",
// //     "host": "ep-green-term-a8hmodit-pooler.eastus2.azure.neon.tech",
// //     "port": 5432,
// //     "dialect": "postgres"
// //   },
// //   "production": {
// //     "use_env_variable": "DATABASE_URL",
// //     "dialect": "postgres",
// //     "dialectOptions": {
// //       "ssl": {
// //         "require": true,
// //         "rejectUnauthorized": false
// //       }
// //     }
// //   }
// // }


// // server/config/db.js
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   'taskmanager',
//   'neondb_owner',
//   'npg_WqX9pg7JYiHe',
//   {
//     host: 'ep-green-term-a8hmodit-pooler.eastus2.azure.neon.tech',
//     dialect: 'postgres',
//     port: 5432,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'taskmanager',
  'neondb_owner',
  'npg_WqX9pg7JYiHe',
  {
    host: 'ep-green-term-a8hmodit-pooler.eastus2.azure.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;