import { getDate, addUserQuery, getUserQuery, editUserQuery, deleteUserQuery, addTransferQuery, getTransferQuery } from "../queries/queries.js";
import path from 'path';
const __dirname = path.resolve();




// Función para obtener la ruta principal
const home = async (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
};




// Función para hacer ping al servidor
const ping = async (req, res) => {
    const date = await getDate();
    res.send(date);
};




// Función para añadir un nuevo usuario
const addUser = async (req, res) => {
    try {
        const { nombre, balance } = req.body;
        const datos = [nombre, balance];
        const newUser = await addUserQuery(datos);
        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};




// Función para obtener todos los usuarios
const getUser = async (req, res) => {
    try {
      const users = await getUserQuery();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
};




// Función para editar un usuario
const editUser = async (req, res) => {
    try {
        const { id } = req.query;
        const { nombre, balance } = req.body;
        const datos = [nombre, balance, id];
        const user = await editUserQuery(datos);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};




// Función para eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await deleteUserQuery(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};




// Función para añadir una nueva transferencia
const addTransfer = async (req, res) => {
    try {
      console.log("body", req.body);
      const datos = req.body;
      console.log(datos);
  
      const result = await addTransferQuery(datos);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
};




// Función para obtener todas las transferencias
const getTransfer = async (req, res) => {
    try {
      const result = await getTransferQuery();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
};





// Exportar todas las funciones
export {
    home,
    ping,
    addUser,
    getUser,
    editUser,
    deleteUser,
    addTransfer,
    getTransfer
};