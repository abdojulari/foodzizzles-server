import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../databases/database";
import * as bcrypt from 'bcrypt';
/* create a new table called user with the following fields: 
id, name, email, password, createdAt, updatedAt
*/
export class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        set(value: string) {
            this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    modelName: 'users',
    timestamps: true
});
