module.exports = (sequelize, Sequelize) => {
  const uddan = sequelize.define("uddan", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: Sequelize.STRING
    },
    father: {
      type: Sequelize.STRING
    },
    subject: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    nid: {
      type: Sequelize.STRING
    },
    kname: {
      type: Sequelize.STRING
    },
    kpodobi: {
      type: Sequelize.STRING
    },
    kmobile: {
      type: Sequelize.STRING
    },
    batch: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return uddan;
};