'use client';

import { useState } from "react";
import styles from "./styles/Button.module.css";

export default function AddToCartButton({ productId }) {
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    async function handleAdd() {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId })
            });

            if (!res.ok) throw new Error("Failed to add to cart");

            setAdded(true);

            // Optional: toast notification
            // e.g., using Bootstrap Toast or simple alert
            // alert("Added to cart!");
        } catch (err) {
            console.error(err);
            alert("Failed to add item to cart");
        } finally {
            setLoading(false);
            setTimeout(() => setAdded(false), 2000); // reset added state
        }
    }

    return (
        <button
            onClick={handleAdd}
            className={`btn btn-success btn-sm col-5 container ${styles.btn} ${loading ? "disabled" : ""}`}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
            ) : added ? (
                "Added!"
            ) : (
                "Add to Cart"
            )}
        </button>
    );
}
