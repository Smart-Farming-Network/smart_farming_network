import { PrismaClient } from '../src/generated/prisma/index.js'
import { PERMISSIONS } from '../src/auth/permissions/permission-keys.js'

const prisma = new PrismaClient()

async function main() {
    for (const key of Object.values(PERMISSIONS)) {
        await prisma.permission.upsert({
            where: { key },
            update: {},
            create: { key },
        })
    }

    console.log('Permissions seeded successfully')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
