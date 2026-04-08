/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("Login attempt for username:", body.username);

    const admin = await prisma.admin.findFirst({
      where: {
        username: body.username  // Find by username instead of first
      }
    });

    if (!admin) {
      console.log("Admin not found for username:", body.username);
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    console.log("Admin found, comparing passwords...");
    const isMatch = await bcrypt.compare(body.password, admin.password);

    if (!isMatch) {
      console.log("Password mismatch");
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({
      id: admin.id,
      username: admin.username,
    });

    return Response.json({
      message: "Login successful",
      token
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return Response.json({ 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}