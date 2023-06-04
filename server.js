const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connectioned succesfully");
    // Start listening the server ...
    app.listen(PORT, () => {
      console.log(`Yelp-demo app listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occured when trying to connect the database.", err);
  });
