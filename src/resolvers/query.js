const Query = {
  users(parent, args, { db }, info) {
    return db.users;
  },

  posts(parent, args, ctx, info) {
    return db.posts;
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
