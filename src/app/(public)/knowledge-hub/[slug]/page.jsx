import Link from "next/link";
import { notFound } from "next/navigation";

import knowledgeBaseArticles from "@/data/knowledgeBase";

export default async function KnowledgeArticlePage({ params }) {
  const { slug } = await params;

  const article = knowledgeBaseArticles.find(
    (item) => item.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section  
        className="breadcrumb-area shadow dark-hard bg-cover text-light"
        style={{ backgroundImage: `url(${article.image})` }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <Link
                href="/knowledge-hub"
                className="text-warning text-decoration-none"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Knowledge Base
              </Link>

              <div className="mt-4">
                <span className="badge bg-warning text-dark mb-3">
                  {article.category}
                </span>

                <h1 className="display-4 fw-bold mb-3">
                  {article.title}
                </h1>

                <p className="lead text-dark-50 mb-0">
                  {article.excerpt}
                </p>

                <div className="mt-4 text-muted-50">
                  <i className="fas fa-clock me-2"></i>
                  {article.readingTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              <article className="knowledge-article">
                {article.content.map((block, index) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={index}
                        className="text-muted fs-5 lh-lg mb-4"
                      >
                        {block.content}
                      </p>
                    );
                  }

                  if (block.type === "heading") {
                    return (
                      <h2
                        key={index}
                        className="fw-bold mt-5 mb-3"
                      >
                        {block.content}
                      </h2>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul
                        key={index}
                        className="text-muted fs-5 lh-lg mb-4 ps-4"
                      >
                        {block.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="mb-2"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "tip") {
                    return (
                      <div
                        key={index}
                        className="alert alert-warning border-0 rounded-4 p-4 my-4"
                      >
                        <div className="fw-bold mb-2">
                          <i className="fas fa-lightbulb me-2"></i>
                          Farming Tip
                        </div>

                        <div>{block.content}</div>
                      </div>
                    );
                  }

                  if (block.type === "warning") {
                    return (
                      <div
                        key={index}
                        className="alert alert-danger border-0 rounded-4 p-4 my-4"
                      >
                        <div className="fw-bold mb-2">
                          <i className="fas fa-triangle-exclamation me-2"></i>
                          Important
                        </div>

                        <div>{block.content}</div>
                      </div>
                    );
                  }

                  return null;
                })}
              </article>

              <div className="border-top mt-5 pt-4">
                <Link
                  href="/knowledge-hub"
                  className="btn btn-dark rounded-pill px-4"
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Explore More Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}