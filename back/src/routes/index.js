const {Router} = require('express');
const router = Router();

const User = require('../models/user');
const Task = require('../models/task')

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('hello :D'))

router.post('/signUp', async (req, res) => {
    try {
        const {name, password} = req.body;
        const newUser = new User({name: name, password: password});
        await newUser.save();
    
        const token = jwt.sign({_id: newUser._id}, 'secretKey');
        res.status(200).json({token});
    } catch (error) {
        res.status(500).send('Error al registrar usuario');
    }
})

router.post('/signIn', async (req, res ) => {
    try {
        const {name, password} = req.body;
        const user = await User.findOne({name});
        if (!user) return res.status(404).send('¡Oh no! Parece que aun no estas registrado');
        if (user.password !== password) return res.status(401).send('¡Oops! Parece que olvidaste tu contraseña');
    
        const token = jwt.sign({_id: user._id}, 'secretKey');
        return res.status(200).json({token});
    } catch (error) {
        res.status(500).send('Error al iniciar sesion');
    }
})

router.get('/getTasks', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener tareas');
    }
});

router.post('/sendTask', async (req, res) => {
    try {
        const {name, title, description, location, department, priority, image} = req.body;
        const newTask = new Task({name, title, description, location, department, priority, image});
        await newTask.save();
        res.status(200).send('Tarea registrada exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar la tarea');
    }
});

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        res.status(401).send("¡Oops! Parece que no tienes la contraseña para ver esto");
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        res.status(401).send("¡Oops! Parece que no tienes la contraseña para ver esto");
    }

    const payload = jwt.verify(token, 'secretKey');
    req.UserId = payload._id;
    next();
}