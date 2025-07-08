/*
Reserva 
{ 
"clientId": ObjectID, 
"vehicle": String, 
"service": String, 
"status": String 
} 
*/
import { Schema, model } from "mongoose";
const reservationSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "client",
        required: [true, "El cliente es obligatorio"]
    },
    vehicle: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z0-9\s-]{4,}$/, "El vehículo debe de tener mínimo 3 caracteres"]

    },
    service: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z\s]{3,}$/, "El servicio debe tener al menos 3 letras"]
    },
    status: {
        type: String,
        enum: ["pendiente", "completada", "cancelada"],
        required: true,
        default: "pendiente"
    }
}, {
    timestamps: true,
    strict: false
});
export default model("reservation", reservationSchema);