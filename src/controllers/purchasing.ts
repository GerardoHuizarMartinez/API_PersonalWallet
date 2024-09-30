import { Request, Response } from "express";
import { handlerHttp } from "../utils/error.handler";
import dbConection from "../../database";

class purchaseController {

    getAllPurchases = async (req: Request, res: Response) => {
        try {

            const mysql = 'SELECT  ROW_NUMBER() OVER (ORDER BY purchaseDate) AS indice, pro.idProduct, cat.name, pro.productName,  pro.paymentMethod, pro.price, pro.purchaseDate, pro.state'
                + ' FROM  product pro'
                + ' INNER JOIN category cat ON cat.idCategory = pro.fk_idCategory'
                + ' INNER JOIN user usr ON usr.idUser = pro.fk_idUser'
                + ' WHERE pro.purchaseDate between ( SELECT CONCAT(YEAR(CURDATE()), "-", LPAD(MONTH(CURDATE()), 2, "0"), "-01"))  AND (SELECT LAST_DAY(curdate())) '
                + ' AND usr.idUser = ? AND pro.state = "Liquidado";'
            //const [rows, fields] = await dbConection.query(sql, [req.body.idUser])


            const sql = 'SELECT  ROW_NUMBER() OVER (ORDER BY purchaseDate) AS indice, pro.idProduct, cat.name, pro.productName,  pro.paymentMethod, pro.price, pro.purchaseDate, pro.state'
                + ' FROM  product pro '
                + ' INNER JOIN category cat ON cat.idCategory = pro.fk_idCategory '
                + ' INNER JOIN user usr ON usr.idUser = pro.fk_idUser '
                + ' WHERE pro.purchaseDate between "2024-08-01" AND "2024-08-31" AND usr.idUser = 1 AND pro.state = "Liquidado"; '

            //const conn = await mysql.createConnection(access);

            const [rows, fields] = await dbConection.query(sql)
            res.json(rows)

        } catch (e) {
            handlerHttp(res, "No se pudieron obtener la data");
        }
    };

    async getAllCategories (req: Request, res: Response) {
        try {

            const sql = 'SELECT cat.idCategory ,cat.name, ROUND(SUM(pro.price), 2) as value '
                + ' FROM category cat'
                + ' INNER JOIN product pro ON pro.fk_idCategory = cat.idCategory'
                + ' INNER JOIN user usr ON usr.idUser = pro.fk_idUser'
                + ' WHERE pro.purchaseDate between "2024-08-01" AND "2024-08-31" AND usr.idUser = 1 AND pro.state = "Liquidado" '
                + ' GROUP BY cat.idCategory;'
            //     const conn = await mysql.createConnection(access);
            const [rows, fields] = await dbConection.query(sql)
            res.json(rows)
 
        } catch (e) {
            handlerHttp(res, "No se pudieron obtener la data")
            console.log(e)
        }
    };

    getSummaryPerMonth = async (req: Request, res: Response) => {
        try {
            const sql = 'SELECT'
                + ' (SELECT IFNULL(ROUND(SUM(price) , 2), 0)  tdd FROM product where purchaseDate between "2024-08-01" AND "2024-08-31" AND paymentMethod = "Efectivo" AND fk_idUser = 1 AND state = "Liquidado") efectivo,'
                + ' (SELECT IFNULL(ROUND(SUM(price) , 2), 0)  tdd FROM product where purchaseDate between "2024-08-01" AND "2024-08-31" AND paymentMethod = "Tarjeta de debito" AND fk_idUser = 1 AND state = "Liquidado") tdd,'
                + ' (SELECT IFNULL(ROUND(SUM(price) , 2), 0) tdd FROM product where purchaseDate between "2024-08-01" AND "2024-08-31" AND paymentMethod = "Tarjeta de credito" AND fk_idUser = 1 AND state = "Liquidado") tdc,'
                + ' (SELECT IFNULL(ROUND(SUM(price) , 2), 0) tdd FROM product where purchaseDate between "2024-08-01" AND "2024-08-31" AND paymentMethod = "Transferencia" AND fk_idUser = 1 AND state = "Liquidado") transfer;'

            const result = await dbConection.query(sql)
            res.json(result);
        } catch (e) {
            handlerHttp(res, "Error")
        }

    }

    async deletePurchase(req: Request, res: Response) {

        try {

            console.log("Body: ", req.body.status)
            console.log("Params: ", req.params.idPurchase)

           
            const sql = 'UPDATE product SET state = ? WHERE idProduct = ?;'
            const result  = await dbConection.query(sql, [req.body.status, req.params.idPurchase]);
            res.json(result)
              
        } catch (e) {
            handlerHttp(res, "Error generico")
            console.log(e)

        }
    };

}

const purchaseControllers = new purchaseController();

export default purchaseControllers;

