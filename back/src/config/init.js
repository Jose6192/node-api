const User = require('../models/user');

async function createAdminUser() {
  try {
    const admin = await User.findOne({ rol: 'Admin' });

    if (!admin) {
      await User.create({
        name: 'admin',
        password: 'password',
        rol: 'Admin',
      });
      console.log('Usuario Admin creado con éxito');
    }
  } catch (error) {
    console.error('Error al crear el usuario Admin:', error);
  }
}

module.exports = createAdminUser;
