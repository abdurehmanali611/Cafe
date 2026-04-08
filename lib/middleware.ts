import { verifyToken } from "./auth";

export function requireAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  return decoded;
}