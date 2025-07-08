/*Cliente 
{ 
"name": String, 
"email": String, 
"password": String, 
"phone": String, 
"age": Number, 
}
*/
import { Schema, model } from "mongoose";
const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Este correo ya está registrado"],
        trim: true,
        match: [/\S+@\S+\.\S+/, "Utilizar un correo válido, ejemplo: juanPerez@gmail.com"]

    },
    password: {
        type: String,
        required: true,
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{4}-?\d{4}$/, "El teléfono debe tener el formato 12345678 o 1234-5678"]
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Debes tener 18 años para utilizar este servicio"]
    }
}, {
    timestamps: true,
    strict: false
});
export default model("client", clientSchema);