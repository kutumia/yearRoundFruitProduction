module.exports = (sequelize, Sequelize) => {
    const center = sequelize.define("center", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      user: {
        type: Sequelize.STRING
      },
      uname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pd_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return center;
  };