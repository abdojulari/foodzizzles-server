'use strict';
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class SidebarTips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  SidebarTips.init({
    details: DataTypes.STRING,
    image: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SidebarTips',
  });
  return SidebarTips;
};