import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req)
  const { id } = await params;
  const body = await req.json();

  const updated = await prisma.branches.update({
    where: { id: Number(id) },
    data: body,
  });
  return Response.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req)
  const { id } = await params;
  await prisma.branches.delete({
    where: { id: Number(id) },
  });
  return Response.json({ message: "Branch deleted" });
}
