import { sequelize } from "./database";

export const connection = async () => {
    try {
        await sequelize.authenticate({
            logging: false
        });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', {cause: error});
    }
}