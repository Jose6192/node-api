const {Router} = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('hello :D'))

router.post('/users/signup', verifyToken, async (req, res) => {
    if (req.UserRol !== 'admin') return res.status(401).json({ message: 'No tienes permiso para crear usuarios' });
    try {
        const { name, password, rol } = req.body;
        const newUser = new User({ name, password, rol });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id, role: newUser.rol }, 'secretKey');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

router.post('/users/signin', async (req, res ) => {
    try {
        const {name, password} = req.body;
        const user = await User.findOne({name});
        if (!user) return res.status(404).json({ message: '¡Oh no! Parece que aun no estas registrado' });
        if (user.password !== password) return res.status(401).json({ message: '¡Oops! Parece que olvidaste tu contraseña' });
    
        const token = jwt.sign({_id: user._id, role: user.rol}, 'secretKey');
        return res.status(200).json({token});
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesion' });
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