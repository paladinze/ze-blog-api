import uuidv4 from "uuid/v4";

const mutation = {
  createUser(parent, args, { db }, info) {
    const newUser = {
      id: uuidv4(),
      ...args.data
    };
    db.users.push(newUser);
    return newUser;
  }
};

export { mutation as default };
