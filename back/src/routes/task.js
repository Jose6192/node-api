const { Router } = require('express');
const router = Router();
const Task = require('../models/task')
const jwt = require('jsonwebtoken');
const multerConfig = require('../config/multer');
const path = require('path');

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

router.post('/tasks/create', async (req, res) => {
    try {
        const { name, email, department, failType, anotherFailType, building, description, place } = req.body;
        const finalizedAt = null;
        const createdAt = new Date();
        createdAt.setHours(createdAt.getHours() - 5) //establece horario sureste de mexico
        const priority = '';
        const status = 'pendiente';
        const solvedby = '';
        const imagePaths = [];

        const folio = await getNextFolio();

        const newTask = new Task({
            name,
            email,
            department,
            failType,
            anotherFailType,
            building,
            description,
            priority,
            place,
            folio,
            imagePaths,
            status,
            solvedby,
            createdAt,
            finalizedAt
        });
        await newTask.save();
        res.status(200).json({ message: 'Reporte registrado exitosamente', folio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrio un error' });
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

        res.status(200).json({ message: 'Tarea actualizada con éxito' });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la tarea' });
    }
});

router.patch('/tasks/upload/:taskId', verifyToken, multerConfig, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body;
        
        console.log(req.files);
        if (req.files) {
            // guardar rutas relativas
            const imagePaths = req.files.map(file => file.filename);
            updates.imagePaths = imagePaths;
        }

        await Task.updateOne({ _id: taskId }, { $set: updates });

        res.status(200).json({ message: 'guardado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardadar el archivo' });
    }
});

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No tienes permisos para hacer esto' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send("No tienes permisos para hacer esto");
    }

    try {
        const payload = jwt.verify(token, 'secretKey');
        req.UserId = payload._id;
        req.UserRol = payload.role;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'El token ha expirado' });
        }
        return res.status(401).json({ message: 'Token inválido' });
    }
}


async function getNextFolio() {
    // Encuentra el último reporte creado
    const lastTask = await Task.findOne().sort({ createdAt: -1 });
    let lastFolioNumber = 0;

    // Si hay un reporte, extrae el número de folio
    if (lastTask) {
        const lastFolio = lastTask.folio;
        const lastFolioParts = lastFolio.split('-');
        lastFolioNumber = parseInt(lastFolioParts[lastFolioParts.length - 1]);
    }

    // Incrementa el número de folio y dar formato
    const nextFolioNumber = lastFolioNumber + 1;
    const nextFolio = `F-${nextFolioNumber.toString().padStart(4, '0')}`; // Formato F-XXXX

    return nextFolio;
}