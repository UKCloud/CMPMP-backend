import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

// export const Dashboard = sequelize.define(
//   "dashboards",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     // Just a 'dumb' field for now. In theory though an entire
//     // dashboard could be saved, assuming the STRING limit isn't reached
//     data: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   }
// );

export class Dashboard extends Model {}

Dashboard.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Just a 'dumb' field for now. In theory though an entire
    // dashboard could be saved, assuming the STRING limit isn't reached
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, {
  sequelize,
  modelName: 'dashboards' 
});