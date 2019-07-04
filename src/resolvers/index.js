import { extractFragmentReplacements } from "prisma-binding";

import Post from "./post";
import Comment from "./comment";
import User from "./user";
import Mutation from "./mutation";
import Query from "./query";

const resolvers = {
  Post,
  Comment,
  User,
  Mutation,
  Query
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
