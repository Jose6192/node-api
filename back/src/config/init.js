const User = require('../models/user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const genericPassword = 'password';

async function createAdminUser() {
  try {
    const admin = await User.findOne({ rol: 'Admin' });
    if (!admin) {
      bcrypt.hash(genericPassword, saltRounds, async (err, hash) => {
        if (err) console.error('Error al encriptar la contraseña del admin:', err);
        else {
          await User.create({
          name: 'admin',
          password: hash,
          rol: 'Admin',
          });
          console.log('Usuario Admin creado con éxito');
        }
      })
    }
  } catch (error) {
    console.error('Error al crear el usuario Admin:', error);
  }
}

module.exports = createAdminUser;
