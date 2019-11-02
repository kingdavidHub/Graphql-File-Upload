import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlUploadExpress } from 'graphql-upload'
import { graphqlExpress } from "graphql-server-express";

import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlExpress({ schema })
);

app.listen(3030);
