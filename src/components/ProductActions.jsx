'use client';

import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductActions({ productId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="d-flex gap-3 mt-4">

                <AddToCartButton className="col-5" productId={productId} />


                <button
                    className="btn btn-outline-success px-4 text-nowrap"
                    onClick={() => setShowModal(true)}
                >
                    Contact Seller
                </button>
            </div>

            <ComingSoonModal
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}
