const {Router} = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs')
const saltRounds = 10;

router.get('/', (req, res) => res.send('hello :D'))

router.post('/users/signup', verifyToken, async (req, res) => {
    if (req.UserRol !== 'Admin') return res.status(401).json({ message: 'No tienes permiso para crear usuarios' });
    try {
        let { name, password, rol } = req.body;
        if (await User.findOne({ name })) return res.status(404).json({ message: 'Este usuario ya está registrado' });
        bcrypt.hash(password, saltRounds, async (err, hash) => { //encriptacionde la contrasena
            if (err) res.status(500).json({message: 'Error interno al guardar contraseña'});
            else {
                password = hash;
                const newUser = new User({ name, password, rol });
                await newUser.save();
                const token = jwt.sign({ _id: newUser._id, role: newUser.rol }, 'secretKey');
                res.status(200).json({ message: 'Usuario registrado con exito' });
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

router.post('/users/signin', async (req, res ) => {
    try {
        let {name, password} = req.body;
        const user = await User.findOne({name});
        if (!user) return res.status(404).json({ message: '¡Oh no! Parece que aun no estas registrado' });
        bcrypt.compare(password, user.password, (err, result) => { //comparar contraseña encriptada
            if (err) res.status(500).json('error interno al leer contraseña')
            else if (result) {
                const token = jwt.sign({_id: user._id, role: user.rol}, 'secretKey');
                return res.status(200).json({token});
            }
            else return res.status(401).json({ message: '¡Oops! Parece que olvidaste tu contraseña' });       
        })
    } catch (error) {
        res.status(500).json({ message: 'Error interno al iniciar sesion' });
    }
});

router.get('/users/get/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        res.status(401).json({ message: 'No tienes Permisos para hacer esto' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        res.status(401).send("No tienes Permisos para hacer esto");
    }

    const payload = jwt.verify(token, 'secretKey');
    req.UserId = payload._id;
    req.UserRol = payload.role;
    next();
}