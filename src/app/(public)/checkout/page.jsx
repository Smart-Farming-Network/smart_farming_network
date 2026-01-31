'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

export default function CheckoutPage() {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [updatingItemId, setUpdatingItemId] = useState(null);
    const [email, setEmail] = useState(""); // guest or logged-in email

    // Fetch cart and user email if logged in
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                // Fetch cart
                const cartRes = await fetch("/api/cart");
                const cartData = await cartRes.json();
                setCart(cartData.data || { items: [] });

                // Try fetching logged-in user
                const profileRes = await fetch("/api/user/profile");
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setEmail(profileData.profile?.email || profileData.email || "");
                }
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const subtotal = cart.items?.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    );

    // Quantity update
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
            console.error(err);
        } finally {
            setUpdatingItemId(null);
        }
    };

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
            console.error(err);
        }
    };

    // Paystack payment
    const handlePaystackPayment = async () => {
        if (!email) {
            alert("Please enter your email to proceed");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/payment/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, cart }),
            });
            const data = await res.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            const handler = window.PaystackPop.setup({
                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
                email,
                amount: subtotal * 100,
                ref: data.data.reference,
                callback: function (response) {
                    window.location.href = `/checkout/verify?reference=${response.reference}`;
                },
                onClose: function () {
                    alert("Payment cancelled");
                },
            });

            handler.openIframe();
        } catch (err) {
            console.error(err);
            alert("Failed to initiate payment");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="text-center py-5">
            <span className="spinner-border text-success"></span>
        </div>
    );

    if (!cart.items.length) return (
        <div className="text-center py-5">
            <h4>Your cart is empty.</h4>
        </div>
    );

    return (
        <div className="container py-5">
            {/* Paystack script */}
            <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />

            <h2 className="mb-4">Checkout</h2>

            {/* Email input for guest (or prefilled for logged-in user) */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>

            {/* Cart items */}
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
                            <button
                                className="btn btn-sm btn-outline-danger"
                                disabled={updatingItemId === item.productId}
                                onClick={() => updateQuantity(item.productId, -1)}
                            >-</button>

                            <span>{item.quantity}</span>

                            <button
                                className="btn btn-sm btn-outline-success"
                                disabled={updatingItemId === item.productId}
                                onClick={() => updateQuantity(item.productId, 1)}
                            >+</button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => removeItem(item.productId)}
                            >Remove</button>
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
                <hr />
                <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span className="fw-bold">₦{subtotal.toLocaleString()}</span>
                </div>

                <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handlePaystackPayment}
                    disabled={loading}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
