const mongoose = require("mongoose");

const private = require("./private/private");

const mongoDBConnectionString =
  process.env.MONGODB || private.mongoDBConnectionString;

mongoose
  .connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB connected");
    }
  })
  .catch(err => console.log(err));
