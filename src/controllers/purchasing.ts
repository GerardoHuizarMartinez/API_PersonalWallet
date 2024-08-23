import { Request, response, Response } from "express";
import { handlerHttp } from "../utils/error.handler";
import dbConection from "../../database";


const getPurchase = (req: Request, res: Response) => {
    try{ 
        res.send( {msg : "Se esta recuperando la data de body " })
        console.log("Ejecucion correcta :D")
       // res.json(res)
    }catch(e){
        handlerHttp( res , "No se pudieron obtener la data")
        console.log(e)
    }
}; 

const getCatgories = async (req: Request, res: Response) => {
    try{ 
        const sql = "Select * from Category;"
   //     const conn = await mysql.createConnection(access);
        const [rows, fields] = await dbConection.query(sql)
        res.json(rows)
        console.log(fields);

    }catch(e){
        handlerHttp( res , "No se pudieron obtener la data")
        console.log(e)
    }
};

const postPurchase = (req: Request, res: Response) => { 
  
    // console.log(res.json(stringify(body)))
    // console.log("Something is wrong")
    try{
       console.log((req.body.name))
       res.send(req.body)

    }catch(e){
      //  handlerHttp( res , "No se pudo agregar el JSON")
        console.log(e)

    }
}; 

const putPurchase = (req: Request, res: Response) =>{};

const deletePurchase = (req: Request, res: Response) =>{};

export {
    getPurchase, postPurchase, putPurchase, deletePurchase, getCatgories
}