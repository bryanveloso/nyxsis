import { prisma } from '@/db';

export async function POST(req: Request) {
  await prisma.login.create({});
}
