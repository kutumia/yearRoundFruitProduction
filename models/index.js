const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.center = require("./center.model.js")(sequelize, Sequelize);
db.centerInfo = require("./centerInfo.js")(sequelize, Sequelize);
db.chp = require("./chp.model.js")(sequelize, Sequelize);
db.farmer = require("./farmer.model.js")(sequelize, Sequelize);
db.kormokorta = require("./kormokorta.model.js")(sequelize, Sequelize);
db.saao = require("./saao.model.js")(sequelize, Sequelize);
db.uddan = require("./uddan.model.js")(sequelize, Sequelize);
db.apa = require("./apa.model.js")(sequelize, Sequelize);
db.buildingDevelopment = require("./buildingDevelopment.model.js")(sequelize, Sequelize);
db.guardDevelopment = require("./guardDevelopment.model.js")(sequelize, Sequelize);
db.landDevelopment = require("./landDevelopment.model.js")(sequelize, Sequelize);
db.seedDevelopment = require("./seedDevelopment.model.js")(sequelize, Sequelize);
db.wallDevelopment = require("./wallDevelopment.model.js")(sequelize, Sequelize);
db.prodorshoni = require("./prodorshoni.model.js")(sequelize, Sequelize);
db.infoChp = require("./infoChp.model.js")(sequelize, Sequelize);
db.infoWorker = require("./infoWorker.model.js")(sequelize, Sequelize);
db.motivation = require("./motivation.model.js")(sequelize, Sequelize);
db.development = require("./development.model.js")(sequelize, Sequelize);
db.female = require("./female.model.js")(sequelize, Sequelize);
db.gardener = require("./gardener.model.js")(sequelize, Sequelize);
db.nurseryman = require("./nurseryman.model.js")(sequelize, Sequelize);
db.sprayman = require("./sprayman.model.js")(sequelize, Sequelize);
db.prodorshoni = require("./prodorshoni.model.js")(sequelize, Sequelize);

module.exports = db;