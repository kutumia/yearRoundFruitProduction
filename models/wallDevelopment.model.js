module.exports = (sequelize, Sequelize) => {
  const wallDevelopment = sequelize.define("walldevelopment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    kaj: {
      type: Sequelize.STRING
    },
    poriman: {
      type: Sequelize.STRING
    },
    ortho: {
      type: Sequelize.STRING
    },
    present: {
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

  return wallDevelopment;
};