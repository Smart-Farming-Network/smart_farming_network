import { prisma } from "@/libs/prisma";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "DELETE") {
        await prisma.user.delete({ where: { id: parseInt(id) } });
        return res.status(200).json({ message: "User deleted" });
    }

    res.status(405).end();
}
