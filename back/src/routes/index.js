const {Router} = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('hello :D'))

router.post('/signUp', async (req, res) => {
    const {name, password} = req.body;
    const newUser = new User({name: name, password: password});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secretKey');
    res.status(200).json({token});
})

router.post('/signIn', async (req, res ) => {
    const {name, password} = req.body;
    const user = await User.findOne({name});
    if (!user) return res.status(404).send('¡Oh no! Parece que aun no estas registrado');
    if (user.password !== password) return res.status(401).send('¡Oops! Parece que olvidaste tu contraseña');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token});
})

router.get('/tasks', verifyToken, (req,res)=>{
    res.send([
        {
            "_id": 1,
            "title": "titulo",
            "description": "descripcion"
        },
        {
            "_id": 2,
            "title": "titulo",
            "description": "descripcion"
        },
        {
            "_id": 3,
            "title": "titulo",
            "description": "descripcion"
        }
    ])
}) 

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