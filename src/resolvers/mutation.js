import uuidv4 from "uuid/v4";

const mutation = {
  createUser(parent, args, { db }, info) {
    const newUser = {
      id: uuidv4(),
      ...args.data
    };
    db.users.push(newUser);
    return newUser;
  },

  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find(user => user.id === id);
    if (!user) {
      throw new Error("user not found!");
    }
  }
};

export { mutation as default };
