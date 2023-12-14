import mongoose from "mongoose";

mongoose.set("strictQuery", false);

// connectng to database
const connectToDB = (mongoURl) => {
  return mongoose.connect(mongoURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDB;