import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnection from "../../database";
import { User } from "../interface/user.interface";
import { Login } from "../interface/login.interface";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";


class UserService {


  async registerNewUser(data: User) {

    const [result]: [ResultSetHeader, FieldPacket[]] = await dbConnection.query(" INSERT INTO user " 
       + " (name, lastName, birthday, gender, telephone, country, postalCode, state, municipality, colony, address, registrationDate) " 
       + " VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", 
      [data.name, data.lastname, data.birthday, data.gender, data.telephone, data.country, data.postalCode, data.state, data.municipality, data.colony, data.address, data.registrationDate]);

      const id = result.insertId

      console.log("ID: " , id)
      console.log({email:data.email, password : data.password, registrationDate: data.registrationDate, fk_idUser: id})

      return {email:data.email, password : data.password, registrationDate: data.registrationDate, fk_idUser: id};  
    
  }


  async getAllUsers() {
    const [result] = await dbConnection.query( "SELECT * FROM user ");
    return (result);
  }


}


const userServ = new UserService();
export default userServ ;
