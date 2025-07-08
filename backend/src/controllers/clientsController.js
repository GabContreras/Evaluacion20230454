/*Este archivo tiene los métodos del CRUD
    (Select, insert, update, delete)
    */

//Creo un array de funciones 

const clientsController = {};
import clientsModel from "../models/Clients.js";
import bcryptjs from "bcryptjs";

//SELECT general
clientsController.getClients = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error });
    }
}

//SELECT por id
clientsController.getClientsById = async (req, res) => {
    try {
        const client = await clientsModel.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
}

//POST crear nuevo cliente

clientsController.createClient = async (req, res) => {
    const { name, email, password, phone, age } = req.body;

    // Validación de longitud mínima de contraseña
    if (!password || password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    try {
        const newClient = new clientsModel({
            name,
            email,
            password: passwordHash,
            phone,
            age
        });

        await newClient.save();
        res.status(200).json({ message: "Cliente creado exitosamente", client: newClient });
    } catch (error) {
        // Manejo especial para error de clave duplicada
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        res.status(500).json({ message: "Error al crear el cliente", error: error.message });
    }
}

//PUT actualizar un cliente 
clientsController.updateClient = async (req, res) => {
    const { name, email, password, phone, age } = req.body;

    // Validación de longitud mínima de contraseña
    if (!password || password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    //Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);
    try {
        const updateClient = await clientsModel.findByIdAndUpdate(req.params.id,
            {
                name,
                email,
                password: passwordHash,
                phone,
                age
            }, {
            new: true
        });
        res.status(200).json({
            message: "Cliente actualizado exitósamente"
        });
    }
    catch (error) {
        // Manejo especial para error de clave duplicada
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        res.status(500).json({ message: "Error al actualizar el cliente", error: error.message });
    }
}

//DELETE eliminar un cliente 
clientsController.deleteClient = async (req, res) => {
    try {
        await clientsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
}

export default clientsController;