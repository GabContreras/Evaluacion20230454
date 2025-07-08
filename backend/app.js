//funciones de la app, tipo login, crud, registros, etc

//inserto todo lo de la libreria express
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import clientRoutes from "./src/routes/clientRoutes.js";
import reservationRoutes from "./src/routes/reservationsRoutes.js";

//import swaggerUi from "swagger-ui-express";
//import fs from "fs";
//import path from "path";

// Creo una constante que es igual a la libreria que acabo de importar, y la ejecuto 

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";



//Traemos el archivo json
const swaggerDocument = JSON.parse(
    fs.readFileSync(
        path.resolve("./documentacion.json"),
        "utf-8"
    )
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/clients", clientRoutes);
app.use("/api/reservations", reservationRoutes);

//Exporto esta constante para usar express en todos lados
export default app;