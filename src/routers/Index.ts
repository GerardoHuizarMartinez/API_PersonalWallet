import { Router } from "express";
import { readdirSync } from "fs";

const router = Router();
const PATH_ROUTER = `${__dirname}`;

/**
 * index.ts purchasing
 * @returns
 */

const cleanFileName = (filenName: String) => {
    const file = filenName.split('.').shift();
    return file;
}

readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "Index") {
        import(`./${cleanName}`).then((moduleRoute) => {
            //console.log(`Se esta cargando la ruta... ${cleanName}`)
            router.use(`/${cleanName}`, moduleRoute.router);
        });
    
    }

    
});

export { router };


