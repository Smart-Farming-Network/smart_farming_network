"use client";

import Image from "next/image";
import Button from "../ui/Button";

export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="card shadow-sm rounded-4 mb-4">
            <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center p-2">
                    <Image
                        src={product.image || "/assets/img/default-product.png"}
                        alt={product.name}
                        className="rounded-4"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-6 p-3">
                    <h5 className="fw-bold text-success mb-1">{product.name}</h5>
                    <p className="mb-1 small text-muted">Category: {product.category}</p>
                    <p className="mb-0 fw-semibold">Price: ₦{product.price.toLocaleString()}</p>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end p-3 gap-2">
                    <Button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="btn-sm btn-outline-success"
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onDelete(product)}
                        className="btn-sm btn-outline-danger"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
