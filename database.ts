import mysql from 'mysql2/promise';
import keys from './keys'


const dbConection = mysql.createPool(keys.local);



export default dbConection;
