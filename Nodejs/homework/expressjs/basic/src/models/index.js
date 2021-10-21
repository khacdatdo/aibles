import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;