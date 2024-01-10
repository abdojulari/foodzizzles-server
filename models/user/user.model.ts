import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../databases/database";
import * as bcrypt from 'bcrypt';
/* create a new table called user with the following fields: 
id, name, email, password, createdAt, updatedAt
*/

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    // Other methods or hooks can be added here

    // Hash the password before saving to the database
    public setPassword(value: string): void {
        this.password = bcrypt.hashSync(value, 10);
    }
}

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
