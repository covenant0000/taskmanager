const { sequelize, User, Task } = require('./models'); // Adjust path if needed

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Fetch all users with their tasks to test associations and data
    const users = await User.findAll({ include: Task });
    console.log('Users and their tasks:', JSON.stringify(users, null, 2));

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testDB();