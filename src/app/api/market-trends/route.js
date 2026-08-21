import { prisma } from "@/libs/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            take: 5,
            include: {
                priceHistory: {
                    orderBy: {
                        recordedAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        const data = products.map((product) => {
            const currentPrice = Number(product.price);

            const latestHistory = product.priceHistory[0];

            const previousPrice = latestHistory?.previousPrice
                ? Number(latestHistory.previousPrice)
                : currentPrice;

            const change = currentPrice - previousPrice;

            const changePercentage =
                previousPrice > 0
                    ? (change / previousPrice) * 100
                    : 0;

            let trend = "STABLE";

            if (changePercentage > 0) {
                trend = "RISING";
            } else if (changePercentage < 0) {
                trend = "FALLING";
            }

            return {
                id: product.id,
                name: product.name,
                price: currentPrice,
                previousPrice,
                change,
                changePercentage: Number(
                    changePercentage.toFixed(2)
                ),
                trend,
            };
        });

        return Response.json({
            data,
        });

    } catch (error) {
        console.error("Market trends error:", error);

        return Response.json(
            {
                error: "Failed to fetch market trends",
            },
            {
                status: 500,
            }
        );
    }
}