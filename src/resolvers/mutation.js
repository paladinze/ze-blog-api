import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

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
      token: generateToken(user.id)
    };
  },

  async createUser(parent, args, { prisma }, info) {
    // validate email
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error("email taken");
    }

    // hash password
    const password = await hashPassword();

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });
    return {
      user,
      token: generateToken(user.id)
    };
  },

  async updateUser(parent, args, { req, prisma }, info) {
    const userId = getUserId(req);
    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    const user = await prisma.mutation.updateUser(
      {
        where: {
          id: userId
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

  async deletePost(parent, args, { req, prisma }, info) {
    const userId = getUserId(req);
    const userOwnsPost = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    });

    if (!userOwnsPost) {
      throw new Error("unable to delete post");
    }

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
