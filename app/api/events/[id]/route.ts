import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req)
  const { id } = await params;
  const body = await req.json();

  const updated = await prisma.events.update({
    where: { id: Number(id) },
    data: {
      ...body,
      maxRegistrants: Number(body.maxRegistrants ?? 50),
    },
  });

  return Response.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req)
  const { id } = await params;
  await prisma.events.delete({
    where: { id: Number(id) },
  });
  return Response.json({ message: "Event deleted" });
}
