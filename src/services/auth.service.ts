import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Login } from "../interface/login.interface";
import { FieldPacket, ResultSetHeader } from "mysql2";
import dbConnection from "../../database";

class AuthService {

  async registerDataForLogin(data: Login) {
    await dbConnection.query(
      "INSERT INTO login (email, passwordUsr, registrationDate, fk_idUser)", [data.email, data.passwordUsr, data.registrationDate, data.fk_idUser]
    );

    //return { id: result.insertId, ...data };
  }

  // async login(email: string, password: string) {
  //   // Comparar la contraseña proporcionada con el hash almacenado
  //   if (await bcrypt.compare(password, user.passwordUsr)) {
  //     const token = jwt.sign(
  //       { id: user.idLogin, username: user.email },
  //       process.env.SECRET_KEY || "",
  //       { expiresIn: "1h" }
  //     );
  //     return { token };
  //   }
  // }

}

const authServ = new AuthService();
export default authServ;
