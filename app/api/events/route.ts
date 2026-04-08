import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  requireAuth(req)
  const body = await req.json();

  const item = await prisma.events.create({
    data: {
      ...body,
      maxRegistrants: Number(body.maxRegistrants ?? 50),
    },
  });
  return Response.json(item);
}

export async function GET() {
  const items = await prisma.events.findMany({
    include: {
      _count: {
        select: {
          registrants: true,
        },
      },
    },
  });
  return Response.json(items);
}
