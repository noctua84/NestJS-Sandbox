// Prisma File for seeding the database with data.
// It will be executed on every `prisma migrate dev` and `prisma migrate reset` commands.
// This can be skipped by adding --skip-seed to the command.
// Any seeds needed for the database should be added here.
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Add your seeds here.
}

main()
    .then(() => console.log('Seeding complete.'))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
