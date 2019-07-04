import jwt from "jsonwebtoken";

const getUserId = (req, requireAuth = true) => {
  const header = req.request.headers.authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "ZEROCKS");
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error("authentication required");
  }

  return null;
};

export { getUserId as default };
