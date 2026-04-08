import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const event = await prisma.events.findUnique({
    where: { id: Number(body.eventId) },
    include: {
      _count: {
        select: {
          registrants: true,
        },
      },
    },
  });

  if (!event) {
    return Response.json({ error: "Selected event was not found" }, { status: 404 });
  }

  if (event._count.registrants >= event.maxRegistrants) {
    return Response.json(
      { error: "This event has reached its reservation limit." },
      { status: 409 },
    );
  }

  const item = await prisma.eventRegistrants.create({
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

  return Response.json(item);
}

export async function GET(req: Request) {
  requireAuth(req);

  const items = await prisma.eventRegistrants.findMany({
    include: {
      event: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return Response.json(items);
}
