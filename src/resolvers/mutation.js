import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";

const mutation = {
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });

    if (!user) {
      throw new Error("Unable to login");
    }
    const verified = await bycrypt.compare(args.data.password, user.password);
    if (!verified) {
      throw new Error("user credential invalid");
    }
    return {
      user,
      token: jwt.sign({ userId: user.id }, "ZEROCKS")
    };
  },

  async createUser(parent, args, { prisma }, info) {
    // validate email
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error("email taken");
    }

    // check password
    if (args.data.password.length < 8) {
      throw new Error("password must be 8 characters or longer");
    }

    // hash password
    const password = await bycrypt.hash(args.data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });
    return {
      user,
      token: jwt.sign({ userId: user.id }, "ZEROCKS")
    };
  },

  async updateUser(parent, args, { prisma }, info) {
    const user = await prisma.mutation.updateUser(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
    return user;
  },

  async createPost(parent, args, { req, prisma }, info) {
    const userId = getUserId(req);
    const post = await prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
    return post;
  },

  async deletePost(parent, args, { prisma }, info) {
    const post = await prisma.mutation.deletePost(
      {
        where: {
          id: args.id
        }
      },
      info
    );

    return post;
  }
};

export { mutation as default };
