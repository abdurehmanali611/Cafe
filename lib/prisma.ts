import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { loadEnvConfig } from "@next/env";

if (!process.env.DATABASE_URL) {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize Prisma.");
}

const connectionUrl = new URL(databaseUrl);

const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb({
    host: connectionUrl.hostname,
    port: Number(connectionUrl.port || 3306),
    user: decodeURIComponent(connectionUrl.username),
    password: decodeURIComponent(connectionUrl.password),
    database: connectionUrl.pathname.slice(1) || undefined,
    connectTimeout: 10_000,
    acquireTimeout: 30_000,
  });

  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
