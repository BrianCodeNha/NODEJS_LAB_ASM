const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = Sequelize.define("user", {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
  },

});
