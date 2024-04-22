import express from 'express';
import { home, ping, addUser, getUser, editUser, deleteUser, addTransfer, getTransfer } from '../controller/userController.js';

const router = express.Router();

// Ruta principal
router.get('/', home);

// Ruta para hacer ping al servidor
router.get('/ping', ping);

// Ruta para añadir un nuevo usuario
router.post('/usuario', addUser);

// Ruta para obtener todos los usuarios
router.get('/usuarios', getUser);

// Ruta para editar un usuario
router.put('/usuario', editUser);

// Ruta para eliminar un usuario
router.delete('/usuario', deleteUser);

// Ruta para añadir una transferencia
router.post('/transferencia', addTransfer);

// Ruta para obtener todas las transferencias
router.get('/transferencias', getTransfer);




// Exportar el router
export default router;