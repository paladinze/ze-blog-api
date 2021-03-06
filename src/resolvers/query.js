const Query = {
  users(parent, args, { db, prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after
    };

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
  }
};

export { Query as default };
