require('dotenv').config(
    { path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' },
);

const config = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
};

module.exports = config;
