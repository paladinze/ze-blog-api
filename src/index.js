import { GraphQLServer } from "graphql-yoga";

import Post from "./resolvers/post";
import Comment from "./resolvers/comment";
import User from "./resolvers/user";
import Mutation from "./resolvers/mutation";
import Query from "./resolvers/query";
import prisma from "./prisma";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Post,
    Comment,
    User,
    Mutation,
    Query
  },
  context(req) {
    return {
      prisma,
      req
    };
  }
});
server.start(() => console.log("Server is running on localhost:4000"));
