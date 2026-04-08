import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  requireAuth(req)
  const { id } = await params;
  await prisma.contacts.delete({
    where: { id: Number(id) },
  });
  return Response.json({ message: "Contact deleted" });
}
