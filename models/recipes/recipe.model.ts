import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../databases/database";
/* create a new table called user with the following fields: 
id, name, description, image, cuisine, category, date, createdAt, updatedAt
*/

export interface RecipeAttributes {
    id: number;
    name: string;
    description: string;
    image: string;
    duration: number;
    category: string;
    cuisine: string;
    date: Date | string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public image!: string;
    public duration!: number;
    public category!: string;
    public cuisine!: string;
    public date!: Date | string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // create relationships with AdditionalDetail


}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    category: DataTypes.STRING,
    cuisine: DataTypes.STRING,
    date: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    modelName: 'recipes',
    timestamps: true
});