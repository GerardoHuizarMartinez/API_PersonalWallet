import { Response } from "express";

const handlerHttp = (res: Response, error: String) => {
    res.status(500);
    res.send({error});
}



export { handlerHttp };  