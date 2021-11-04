import database from '../config/database';
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(database.name, database.user, database.password, {
    dialect: 'mysql',
    host: database.host
});

export default sequelize;