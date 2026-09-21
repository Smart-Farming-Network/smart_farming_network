"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import KnowledgeCard from "@/components/KnowledgeCard";
import knowledgeBaseArticles from "@/data/knowledgeBase";

const categories = [
  "All",
  "Crop Production",
  "Smart Farming",
  "Weather & Climate",
  "Pest & Disease Management",
  "Agribusiness",
];

export default function KnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featuredArticle =
    knowledgeBaseArticles.find((article) => article.featured) ||
    knowledgeBaseArticles[0];

  const filteredArticles = useMemo(() => {
    return knowledgeBaseArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" ||
        article.category === activeCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        article.title.toLowerCase().includes(searchText) ||
        article.excerpt.toLowerCase().includes(searchText) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchText)
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main>
      {/* Header */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="text-warning fw-bold text-uppercase">
                GSFN Knowledge Base
              </span>

              <h1 className="display-4 fw-bold mt-2 mb-3">
                Practical Knowledge for Better Farming
              </h1>

              <p className="lead text-muted mb-4">
                Access practical farming guides, agricultural knowledge,
                smart-farming insights, and business resources designed to
                help you make better decisions.
              </p>

              {/* Search */}
              <div className="position-relative mx-auto" style={{ maxWidth: 650 }}>
                <i
                  className="fas fa-search position-absolute text-muted"
                  style={{
                    left: 20,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                ></i>

                <input
                  type="search"
                  className="form-control form-control-lg rounded-pill ps-5 pe-4"
                  placeholder="Search farming guides..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`btn rounded-pill px-4 ${
                  activeCategory === category
                    ? "btn-warning"
                    : "btn-outline-dark"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {activeCategory === "All" && !search && featuredArticle && (
        <section className="py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="text-warning fw-bold">
                  FEATURED GUIDE
                </span>
                <h2 className="fw-bold mb-0">
                  Start Learning
                </h2>
              </div>
            </div>

            <div className="row align-items-center bg-light text-dark rounded-4 overflow-hidden">
              <div className="col-lg-6 p-0">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-100"
                  style={{
                    height: 360,
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="col-lg-6 p-4 p-lg-5">
                <span className="badge bg-warning text-dark mb-3">
                  {featuredArticle.category}
                </span>

                <h2 className="fw-bold mb-3">
                  {featuredArticle.title}
                </h2>

                <p className="text-dark-50 mb-4">
                  {featuredArticle.excerpt}
                </p>

                <Link
                  href={`/knowledge-hub/${featuredArticle.slug}`}
                  className="btn btn-warning rounded-pill px-4"
                >
                  Read Guide
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="mb-4">
            <span className="text-warning fw-bold">
              KNOWLEDGE LIBRARY
            </span>

            <h2 className="fw-bold">
              {search || activeCategory !== "All"
                ? "Search Results"
                : "Latest Guides"}
            </h2>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="row">
              {filteredArticles.map((article) => (
                <KnowledgeCard
                  key={article.id}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div
                className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: 80,
                  height: 80,
                }}
              >
                <i className="fas fa-search fs-3 text-muted"></i>
              </div>

              <h4>No guides found</h4>

              <p className="text-muted">
                Try another search term or select a different category.
              </p>

              <button
                type="button"
                className="btn btn-dark rounded-pill px-4"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}