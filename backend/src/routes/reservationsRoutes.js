/*
CRUD de Reservas: 
GET /reservations/ – Muestra todas las reservas de un cliente 
GET /reservations/:id – Obtiene una reserva por ID 
POST /reservations/– Crea una reserva para un cliente 
PUT /reservations/:id – Actualiza una reserva 
DELETE /reservations/:id – Elimina una reserva
 */
import express from "express";
import reservationController from "../controllers/reservationsController.js";
const router = express.Router();
// Rutas para el CRUD de reservas
router.route("/")
    .get(reservationController.getReservations) // Obtener todas las reservas
    .post(reservationController.createReservation) // Crear una nueva reserva
router.route("/:id")
    .get(reservationController.getReservationsById) // Obtener una reserva por ID
    .put(reservationController.updateReservation) // Actualizar una reserva
    .delete(reservationController.deleteReservation) // Eliminar una reserva
export default router;
