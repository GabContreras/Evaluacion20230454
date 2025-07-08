/*Este archivo tiene los métodos del CRUD
    (Select, insert, update, delete)
    */

//Creo un array de funciones 

const reservationController = {};
import reservationModel from "../models/Reservations.js";

//SELECT general
reservationController.getReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find().populate('clientId');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reservas", error });
    }
}

//SELECT por id
reservationController.getReservationsById = async (req, res) => {
    try {
        const reservation = await reservationModel.findById(req.params.id).populate('clientId');
        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reserva", error });
    }
}
//POST crear nueva reserva
reservationController.createReservation = async (req, res) => {
    const { clientId, vehicle, service, status } = req.body;

    try {
        const newReservation = new reservationModel({
            clientId,
            vehicle,
            service,
            status: status || 'pendiente' 
        });

        await newReservation.save();
        res.status(200).json({ message: "Reserva creada exitosamente", reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva", error });
    }
}

//PUT actualizar una reserva
reservationController.updateReservation = async (req, res) => {
    const { clientId, vehicle, service, status } = req.body;
    try {
        const updatedReservation = await reservationModel.findByIdAndUpdate(req.params.id,
            {
                clientId,
                vehicle,
                service,
                status
            }, { new: true });

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.status(200).json({ message: "Reserva actualizada exitosamente", reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva", error });
    }
}
//DELETE eliminar una reserva
reservationController.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await reservationModel.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva", error });
    }
}
export default reservationController;