'use client';

import Image from 'next/image';
import Link from 'next/link';

/* MODERN CARD */
export default function ServiceModern({ title, price, image, desc, features, button }) {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="card modern-card h-100 border-0">

                <div className="card-img-wrapper">
                    <Image width={500} height={300} src={image} className="card-img-top" alt={title} />
                    <span className="price-badge">{price}</span>
                </div>

                <div className="card-body">
                    <h5 className="fw-bold">{title}</h5>
                    <p className="text-muted small">{desc}</p>

                    <ul className="list-unstyled small">
                        {features.map((f, i) => (
                            <li key={i}>• {f}</li>
                        ))}
                    </ul>

                    <Link href="#" className="btn btn-success w-100 mt-3">
                        {button}
                    </Link>
                </div>

            </div>
        </div>
    );
}