module.exports = (sequelize, Sequelize) => {
  const motivation = sequelize.define("motivation", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    farmer: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    bagan: {
      type: Sequelize.STRING
    },
    jomi: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return motivation;
};