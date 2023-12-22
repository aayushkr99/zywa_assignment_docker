const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const CardStatus = sequelize.define(
  "CardStatus",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

(async () => {
  await sequelize.sync();
  console.log("Model synchronized with the database.");
})();

module.exports = CardStatus;
