import mysql2 from 'mysql2/promise';
import MySqlConfig from './mysql_config.js';

export async function createDatabaseConnection() {
    try {
        const connection = await mysql2.createConnection(MySqlConfig);
        console.log('Conexão com o mysql efetuada com sucesso!');
        return connection;
    } catch (error) {
        console.log(`ERRO! : ${error.stack}`);
    }
}

const conection = await createDatabaseConnection();
export default conection;