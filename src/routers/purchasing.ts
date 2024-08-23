import { Request, Router, Response } from "express";
import { getCatgories, getPurchase, postPurchase } from "../controllers/purchasing";

const router = Router();

router.get('/', getPurchase); 

router.get('/cat', getCatgories); 

router.post('/', postPurchase); 

export {router};