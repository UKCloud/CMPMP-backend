import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const User = sequelize.define(
  "users",
  {
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
  }
);