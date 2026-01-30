'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [updatingItemId, setUpdatingItemId] = useState(null);

    // Fetch cart from API
    useEffect(() => {
        async function fetchCart() {
            try {
                setLoading(true);
                const res = await fetch("/api/cart");
                const data = await res.json();
                setCart(data.data || { items: [] });
            } catch (err) {
                console.error("Failed to fetch cart", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCart();
    }, []);

    // Update item quantity
    const updateQuantity = async (productId, delta) => {
        try {
            setUpdatingItemId(productId);
            const res = await fetch("/api/cart", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, delta }),
            });
            const data = await res.json();
            if (data.success) setCart(data.data);
        } catch (err) {
            console.error("Failed to update quantity", err);
        } finally {
            setUpdatingItemId(null);
        }
    };

    // Remove item
    const removeItem = async (productId) => {
        try {
            const res = await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            const data = await res.json();
            if (data.success) setCart(data.data);
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    // Subtotal calculation
    const subtotal = cart.items?.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    );

    if (loading) return (
        <div className="text-center py-5">
            <span className="spinner-border text-success"></span>
        </div>
    );

    if (cart.items.length === 0) return (
        <div className="text-center py-5">
            <h4>Your cart is empty.</h4>
        </div>
    );

    return (
        <div className="container py-5">

            <h2 className="mb-4">Checkout</h2>

            {/* Cart Items */}
            <div className="list-group mb-4 shadow-sm">
                {cart.items.map(item => (
                    <div key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            {item.product?.image && (
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                />
                            )}
                            <div>
                                <h6 className="mb-1">{item.product?.name || "Product not available"}</h6>
                                <small className="text-success fw-bold">
                                    ₦{(item.product?.price || 0).toLocaleString()} x {item.quantity}
                                </small>
                            </div>
                        </div>

                        <div className="d-flex gap-2 align-items-center">
                            {/* Decrease */}
                            <button
                                className="btn btn-sm btn-outline-danger" disabled
                                // disabled={updatingItemId === item.productId}
                                onClick={() => updateQuantity(item.productId, -1)}
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            {/* Increase */}
                            <button
                                className="btn btn-sm btn-outline-success" disabled
                                // disabled={updatingItemId === item.productId}
                                onClick={() => updateQuantity(item.productId, 1)}
                            >
                                +
                            </button>

                            {/* Remove */}
                            <button
                                className="btn btn-sm btn-danger" disabled
                                onClick={() => removeItem(item.productId)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="card p-3 shadow-sm">
                <h5>Order Summary</h5>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span className="fw-bold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span className="fw-bold">₦0</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span className="fw-bold">₦{subtotal.toLocaleString()}</span>
                </div>

                {/* Checkout Button */}
                <button className="btn btn-success w-100 mt-3">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
