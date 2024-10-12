import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthController {

    
 SECRET_KEY = 'tu_secreto'; // Cambia esto por una clave más segura

 register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email y contraseña son requeridos.');
    }


};

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;



    const token = jwt.sign({ email: "texto prueba" }, this.SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
};

}



const authController = new AuthController();

export default authController;