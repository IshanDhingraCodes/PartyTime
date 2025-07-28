import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD;

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME,
      passwordHash,
    },
  });

  console.log("Admin user created.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
