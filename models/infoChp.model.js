module.exports = (sequelize, Sequelize) => {
  const infoChp = sequelize.define("infochp", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    prodorshoni: {
      type: Sequelize.STRING
    },
    bagan: {
      type: Sequelize.STRING
    },
    proBagan: {
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

  return infoChp;
};