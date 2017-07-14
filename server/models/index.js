const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

/*let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    process.env.DATABASE_URL,
    { dialect: 'postgress' }
  );
} */

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DATABASE_URL, [config.use_env_variable]);
    /*{ dialect: 'postgress',
      dialectOptions: {
        ssl: true,
        native: true
      } }
  );*/ 
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
    /* process.env.DATABASE_URL,
    { dialect: 'postgress',
      dialectOptions: {
        ssl: true,
        native: true
      } } */
  );
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
