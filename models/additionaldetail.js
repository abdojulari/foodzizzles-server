'use strict';
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class AdditionalDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdditionalDetail.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        onDelete: 'CASCADE'
      })
    }
  }
  AdditionalDetail.init({
    recipeId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdditionalDetail',
  });
  return AdditionalDetail;
};