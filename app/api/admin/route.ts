import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  requireAuth(req);
  const admin = await prisma.admin.findFirst();
  if (!admin) {
    return Response.json({ error: "Admin not found" }, { status: 404 });
  }
  return Response.json(admin);
}


export async function PUT(req: Request) {
  requireAuth(req);
  const body = await req.json();

  const admin = await prisma.admin.findFirst();

  if (!admin) {
    return Response.json({ error: "Admin not found" }, { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const updated = await prisma.admin.update({
    where: { id: admin.id },
    data: {
      username: body.username,
      password: hashedPassword,
    },
  });

  return Response.json(updated);
}
