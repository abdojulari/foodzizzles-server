import { Sequelize } from "sequelize";
const env =  process.env.NODE_ENV || 'development';
// load the configuration from the config.ts file
const config: any  = require(`${__dirname}/../config/config.js`)[env];
// destructure the config
const { username, password, database, host, dialect } = config;
export const sequelize = new Sequelize(
    database, 
    username, 
    password, 
    { 
        host: host,
        dialect: dialect,
        logging: false
    }
);

