const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("✅mongodb connected");
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};

module.exports = connectToDb;
