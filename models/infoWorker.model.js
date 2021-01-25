module.exports = (sequelize, Sequelize) => {
  const infoWorker = sequelize.define("infoworker", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: Sequelize.STRING
    },
    adress: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    niyog: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return infoWorker;
};