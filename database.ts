import mysql from 'mysql2/promise';
import keys from './keys'


const dbConnection = mysql.createPool(keys.local);

export default dbConnection;
