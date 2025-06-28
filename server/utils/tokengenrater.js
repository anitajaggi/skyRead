import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,           // Always true in production
    sameSite: "None",       // ← This is crucial for cross-site cookie sharing
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
