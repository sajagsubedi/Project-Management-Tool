//Imports
import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import connectToDB from "./config/db.js";
import cors from "cors";

//Initialization
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Connect Db
connectToDB(process.env.URI);

//middleware
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, console.log(`Server running on port ${port}`));
