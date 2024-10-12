import { Request, Response } from "express";
import userServ from "../services/user.service";
import logServ from "../services/auth.service"
import { User } from "../interface/user.interface";
import { Login } from "../interface/login.interface";


class UserController {
    
  async register(req: Request, res: Response) {
    try {
         
      const newUser = await userServ.registerNewUser(req.body);
      await logServ.registerDataForLogin({ ...req.body, fk_idUser: newUser.fk_idUser });
    
   //   console.log("Controlador: " , user, login)
      //res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred." });
      }
    }  
  }


  async newLogin(req:Request, res:Response){
      try{
          //const log = await 
      } catch(error: any){
        res.json(error)
      }
  }

  async obtain(req: Request, res: Response) {
    try {
      const user = await userServ.getAllUsers();
        console.log(res.json(user)); // Debería mostrar 'object'
       // res.status(201).json(user); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred." });
      }
    }
  }
}

const userContro = new UserController();
export default userContro;