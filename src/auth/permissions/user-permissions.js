// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

export async function getUserExtraPermissions(userId) {
    const records = await prisma.userPermission.findMany({
        where: { userId },
        select: {
            permission: {
                select: { key: true },
            },
        },
    })

    return records.map(r => r.permission.key)
}
