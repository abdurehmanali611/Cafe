import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";
import { adminPasswordUpdateForm } from "@/lib/validations";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  try {
    const session = requireAuth(req);
    const admin = await prisma.admin.findUnique({
      where: { id: Number(session.id) },
      select: {
        id: true,
        username: true,
      },
    });

    if (!admin) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    return Response.json(admin);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }
}


export async function PUT(req: Request) {
  try {
    const session = requireAuth(req);
    const body = await req.json();
    const parsed = adminPasswordUpdateForm.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return Response.json(
        { error: firstIssue?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: Number(session.id) },
    });

    if (!admin) {
      return Response.json({ error: "Admin not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(
      parsed.data.currentPassword,
      admin.password,
    );

    if (!isMatch) {
      return Response.json(
        { error: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
      },
    });

    return Response.json({
      message: "Password updated successfully",
      username: admin.username,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }
}
