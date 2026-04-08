import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  requireAuth(req)
  const body = await req.json();
  const item = await prisma.contacts.create({
    data: body,
  });
  return Response.json(item);
}

export async function GET() {
  const items = await prisma.contacts.findMany();
  return Response.json(items);
}
