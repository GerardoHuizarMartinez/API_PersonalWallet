import { Router } from "express";
import purchaseControllers from "../controllers/purchasing";

const router = Router();

router.get('/getAllPurchases', purchaseControllers.getAllPurchases); 

router.get('/getAllCategories', purchaseControllers.getAllCategories ); 

router.get('/getSummaryPerMonth', purchaseControllers.getSummaryPerMonth );

router.put('/deletePurchase/:idPurchase', purchaseControllers.deletePurchase);

router.post('/', ); 
 
export {router};