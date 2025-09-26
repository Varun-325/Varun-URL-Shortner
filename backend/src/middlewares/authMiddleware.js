import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "No Token Found" });
    }
    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decrypted;
    next();
  } catch (error) {
    res.status(401).json({ message: `Unauthorized: ${error.message}` });
  }
};
