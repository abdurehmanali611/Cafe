/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d", // ⏳ token expires in 1 day
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}