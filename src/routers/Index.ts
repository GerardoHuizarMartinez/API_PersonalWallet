import { Router } from "express";
import { readdirSync } from "fs";

const router = Router();
const PATH_ROUTER = `${__dirname}`;

const cleanFileName = (filenName: String) => {
    const file = filenName.split('.').shift();
    return file;
}


const loadRoutes = async () => {
    const files = readdirSync(PATH_ROUTER);
    
    for (const fileName of files) {
        const cleanName = cleanFileName(fileName);
        if (cleanName !== "Index") { 
            try {
                const moduleRoute = await import(`./${cleanName}`);
                router.use(`/api/${cleanName}`, moduleRoute.router);
                console.log(`/api/${cleanName}`);
            } catch (error) {
                console.error(`Error al cargar la ruta ${cleanName}:`, error);
            }
        }
    }
};

loadRoutes();

// readdirSync(PATH_ROUTER).filter((fileName) => {
//     const cleanName = cleanFileName(fileName);
//     if (cleanName !== "Index") {
//         import(`./${cleanName}`).then((moduleRoute) => {
//             console.log(`Se esta cargando la ruta... ${cleanName}`)
//             router.use(`/api/${cleanName}`, moduleRoute.router);
//         });
    
//     }
    
// });


export { router };


