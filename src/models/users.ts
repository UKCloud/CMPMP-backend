import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class User extends Model {}

User.init({
  sub: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'users' 
});