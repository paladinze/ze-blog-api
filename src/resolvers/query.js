const Query = {
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ username_contains: args.query }, { email_contains: args.query }]
      };
    }

    return prisma.query.users(opArgs, info);
  },

  posts(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        title_contains: args.query
      };
    }

    return prisma.query.posts(opArgs, info);
  },

  comments(parent, args, ctx, info) {
    return db.comments;
  },
  me() {
    return {
      id: "123",
      name: "mike",
      email: "paladin",
      age: 13
    };
  }
};

export { Query as default };
