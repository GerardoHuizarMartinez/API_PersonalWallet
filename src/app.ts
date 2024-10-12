//import "dotenv/config"
import express from "express"
import cors from "cors"
import dbConection from "../database";
import { router } from "./routers/Index";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()) ; //peticiones a servidor desde angular
app.use(express.json()); //entender json (antes body parser)
app.use(express.urlencoded({ extended: false })); //validar formuarios html
app.use(router); //Haciendo uso de las rutas de compras

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir todas las orígenes
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Ajuste de encabezados permitidos
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
        next();
    });

dbConection.getConnection()
    .then(() => {
        console.log("Conexión establecida correctamente con la base de datos");
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });


app.listen(PORT, () => console.log(`El servidor abierto en el puerto: ${PORT}`));