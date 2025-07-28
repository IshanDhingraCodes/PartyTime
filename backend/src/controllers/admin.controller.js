import bcrypt from "bcryptjs";
import { db } from "../lib/db.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await db.admin.findUnique({ where: { username } });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign(
    {
      id: admin.id,
      username: admin.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({ message: "Login Successfully." });
};

export const logout = async (req, res) => {
  await res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully." });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const adminId = req.user.id;

  const admin = await db.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found." });
  }

  const valid = await bcrypt.compare(oldPassword, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Old password is incorrect." });
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.admin.update({
    where: { id: adminId },
    data: { passwordHash: newHash },
  });

  res.json({ message: "Password changed successfully." });
};

export const checkAuth = async (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};
