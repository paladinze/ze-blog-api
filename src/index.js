import { GraphQLServer } from "graphql-yoga";
import { resolvers, fragmentReplacements } from "./resolvers";

import prisma from "./prisma";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(req) {
    return {
      prisma,
      req
    };
  },
  fragmentReplacements
});
server.start(() => console.log("Server is running on localhost:4000"));
