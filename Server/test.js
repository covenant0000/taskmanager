const { sequelize, User, Task } = require('./models');

// ========== CREATE ==========
async function createUser() {
  await sequelize.sync({ force: true }); // WARNING: This will reset your DB
  console.log('Database synced.');

  const user = await User.create({
    username: 'Mac',
    email: 'test@example.com',
    password: 'secret123',
  });

  const task = await Task.create({
    title: 'Complete the project',
    description: 'Finish the backend setup',
    userId: user.id,
  });

  console.log('Created user and task:', user.toJSON(), task.toJSON());
  await sequelize.close();
}

// ========== READ ONE USER ==========
async function readUser(userId) {
  await sequelize.sync();
  const user = await User.findOne({
    where: { id: userId },
    include: Task,
  });

  console.log('User with tasks:', JSON.stringify(user, null, 2));
  await sequelize.close();
}

// ========== READ ALL USERS ==========
async function readAllUsers() {
  await sequelize.sync();
  const users = await User.findAll({ include: Task });

  console.log('All users with tasks:', JSON.stringify(users, null, 2));
  await sequelize.close();
}

// ========== UPDATE ==========
async function updateUser(userId, newEmail) {
  await sequelize.sync();
  const user = await User.findByPk(userId);
  if (!user) {
    console.log('User not found');
  } else {
    user.email = newEmail;
    await user.save();
    console.log('Updated user:', user.toJSON());
  }
  await sequelize.close();
}

// ========== DELETE ==========
async function deleteUser(userId) {
  await sequelize.sync();
  const user = await User.findByPk(userId);
  if (!user) {
    console.log('User not found');
  } else {
    await user.destroy();
    console.log('Deleted user with ID:', userId);
  }
  await sequelize.close();
}

// ========== COUNT USERS ==========
async function countUsers() {
  await sequelize.sync();
  const count = await User.count();
  console.log('Number of users:', count);
  await sequelize.close();
}

/* === Uncomment ONE of these to run === */

// createUser();
// readUser(1);
readAllUsers();
 //updateUser(1, 'mac@gmail.com');
// deleteUser(1);
countUsers();