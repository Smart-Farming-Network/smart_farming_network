'use client';

import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";

export default function ProductActions() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="d-flex gap-3 mt-4">
                <button
                    className="btn btn-success px-4 text-nowrap"
                    onClick={() => setShowModal(true)}
                >
                    Buy Now
                </button>

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
