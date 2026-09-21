import Link from "next/link";

export default function KnowledgeCard({ article }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <article className="card h-100 border-0 shadow-sm overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column p-4">
          <span className="badge bg-warning text-dark align-self-start mb-3">
            {article.category}
          </span>

          <h4 className="mb-3">{article.title}</h4>

          <p className="text-muted mb-3">
            {article.excerpt}
          </p>

          <div className="mt-auto">
            <small className="text-muted d-block mb-3">
              <i className="fas fa-clock me-2"></i>
              {article.readingTime}
            </small>

            <Link
              href={`/knowledge-hub/${article.slug}`}
              className="btn btn-dark rounded-pill px-4"
            >
              Read Guide
              <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}