/*
CRUD de Clientes: 
GET /clients – Lista todos los clientes 
GET /clients/:id – Obtiene un cliente por ID 
POST /clients – Crea un nuevo cliente 
PUT /clients/:id – Actualiza un cliente 
DELETE /clients/:id – Elimina un cliente 
*/

import express from "express";
import clientsController from "../controllers/clientsController.js";

const router = express.Router();
// Rutas para el CRUD de clientes

router.route("/")
    .get(clientsController.getClients) // Obtener todos los clientes
    .post(clientsController.createClient) // Crear un nuevo cliente

router.route("/:id")
.get(clientsController.getClientsById) // Obtener un cliente por ID
.put(clientsController.updateClient) // Actualizar un cliente
.delete(clientsController.deleteClient) // Eliminar un cliente

export default router;
