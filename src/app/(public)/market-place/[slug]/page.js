import { prisma } from "@/libs/prisma";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "@/components/ProductActions";

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
    });

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h4>Product not found</h4>
                <Link href="/market-place" className="btn btn-success mt-3">
                    Back to Marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <nav className="mb-4">
                <Link href="/" className="text-muted text-decoration-none">Home</Link>{" "}
                /{" "}
                <Link href="/market-place" className="text-muted text-decoration-none">
                    Marketplace
                </Link>{" "}
                / <span className="fw-semibold">{product.name}</span>
            </nav>

            <div className="row g-5">

                <div className="col-md-6">
                    <div className="border rounded p-4 text-center shadow-sm">
                        {product.image && (
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={420}
                                height={420}
                                className="img-fluid"
                            />
                        )}
                    </div>
                </div>

                <div className="col-md-6">
                    <span className="badge bg-success mb-2">{product.category}</span>

                    <h2 className="fw-bold">{product.name}</h2>

                    <h4 className="text-success fw-bold my-3">
                        ₦{Number(product.price).toLocaleString()}
                    </h4>

                    <p className="text-muted">
                        High-quality agricultural product available on Smart Farming Network.
                    </p>

                    <ProductActions />
                </div>
            </div>
        </div>
    );
}
