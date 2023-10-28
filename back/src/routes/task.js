const {Router} = require('express');
const router = Router();
const Task = require('../models/task')
const jwt = require('jsonwebtoken');
const multerConfig = require('../config/multer');

router.get('/tasks/get', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});

router.get('/tasks/get/:taskId', verifyToken, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
});

router.post('/tasks/create', multerConfig, async (req, res) => {
    try {
        const { name, title, description, location, department, priority, status, compleatedTime } = req.body;
        const imagePaths = req.files.map(file => file.path);
        const newTask = new Task({
            name,
            title,
            description,
            location,
            department,
            priority,
            compleatedTime,
            status,
            imagePaths
        });
        await newTask.save();
        res.status(200).json({ message: 'Tarea registrada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la tarea' });
    }
});

router.delete('/tasks/delete/:taskId', verifyToken, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        await task.deleteOne();
        res.status(200).json({ message: 'Se elimino la tarea con exito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
})

router.patch('/tasks/update/:taskId', verifyToken, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body;
        
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        await Task.updateOne({ _id: taskId }, { $set: updates });

        res.status(200).json({ message: 'Tarea actualizada con éxito'});
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la tarea' });
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