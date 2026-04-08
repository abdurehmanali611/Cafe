import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req);
  const { id } = await params;
  const body = await req.json();

  const updated = await prisma.eventRegistrants.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      eventId: Number(body.eventId),
    },
    include: {
      event: true,
    },
  });

  return Response.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req);
  const { id } = await params;

  await prisma.eventRegistrants.delete({
    where: { id: Number(id) },
  });

  return Response.json({ message: "Event registrant deleted" });
}
