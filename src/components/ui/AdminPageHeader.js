import Link from "next/link";

export default function PageHeader({ title, backLink, backText }) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-success">{title}</h2>
            {backLink && (
                <Link href={backLink} className="text-success fw-medium text-decoration-none">
                    {backText || "← Back"}
                </Link>
            )}
        </div>
    );
}
