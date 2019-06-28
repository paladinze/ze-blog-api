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

const db = {
  users,
  posts,
  comments
}
export default db