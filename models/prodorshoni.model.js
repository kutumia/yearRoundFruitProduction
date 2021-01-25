module.exports = (sequelize, Sequelize) => {
  const prodorshoni = sequelize.define("prodorshoni", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    ortho: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    fol: {
      type: Sequelize.STRING
    },
    jomi: {
      type: Sequelize.STRING
    },
    farmer: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    present: {
      type: Sequelize.STRING
    },
    saao: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    center_id: {
      type: Sequelize.INTEGER
    }
  });

  return prodorshoni;
};