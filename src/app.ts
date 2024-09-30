import "dotenv/config"
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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
        //res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Ajuste aquí
        res.setHeader('Access-Control-Allow-Methods', 'Content-Type');
        next();
    });

dbConection.getConnection().then( () => {
    //console.log("Se realizo la conexión correctamente con la base de datos");
    dbConection.releaseConnection;
});


app.listen(PORT, () => console.log(`El servidor abierto en el puerto: ${PORT}`));