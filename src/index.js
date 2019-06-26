import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

const users = [
  {
    id: 1,
    name: "ze"
  },
  {
    id: 2,
    name: "Tom"
  },
  {
    id: 3,
    name: "Tinker"
  }
];

const posts = [
  {
    id: 1,
    title: "post 1",
    author: 2
  },
  {
    id: 2,
    title: "post 2",
    author: 3
  },
  {
    id: 3,
    title: "post 1",
    author: 1
  }
];

const comments = [
  {
    id: 1,
    text: "good post",
    author: 1
  },
  {
    id: 2,
    text: "bad post",
    author: 3
  }
];

const typeDefs = `
  type Query {
    users: [User!]!
    me: User!
    posts: [Post!]!
    post: Post!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }

  type User {
    id: ID!
    name: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      return users;
    },

    posts(parent, args, ctx, info) {
      return posts;
    },

    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return {
        id: "123",
        name: "mike",
        email: "paladin",
        age: 13
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const newUser = {
        id: uuidv4(),
        name: args.name
      };
      users.push(newUser);
      return newUser;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id == parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => (user.id = parent.author));
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
