import { Sequelize, type Dialect } from 'sequelize';
import { config } from './config';

export const sequelize = new Sequelize({
  dialect: config.dbEngine as Dialect,
  storage: config.dbStorage,
  logging: config.nodeEnv != "production" // log out to console when environment is not production
});