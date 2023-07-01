import dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config();

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    define: {
        timestamps: false
    },
    logging: false
});

try {
    await db.authenticate();
    console.log('Database connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default db;