'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MarketPlacePage() {
  const [view, setView] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const limit = 12;
  const categories = ["Seeds", "Tools", "Produce", "Fertilizers"];

  useEffect(() => {
    fetchProducts();
  }, [page]);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
      const result = await res.json();

      setProducts(result.data);
      setLastPage(result.meta.lastPage);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = activeCategory
    ? products.filter(p => p.category === activeCategory)
    : products;

  return (
    <div className="container py-5">

      {/* HERO */}
      <div
        className="breadcrumb-area text-center shadow dark-hard bg-cover text-light"
        style={{ backgroundImage: "url('/assets/img/4.jpeg')" }}
      >
        <div className="container">
          <h1>Products</h1>
          <nav>
            <Link href="/" className="text-light">
              <i className="fas fa-home"></i> Home
            </Link>{" "}
            / Shop
          </nav>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <ul className="nav nav-pills navbar-brand mb-4 mt-4">
        {categories.map(cat => (
          <li className="nav-item" key={cat}>
            <button
              className={`nav-link ${activeCategory === cat ? "active" : ""}`}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? "" : cat)
              }
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* VIEW TOGGLE */}
      <div className="d-flex justify-content-end mb-3">
        <div className="btn-group">
          <button
            className={`btn btn-sm ${view === "grid" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setView("grid")}
          >
            <i className="fas fa-th-large"></i>
          </button>
          <button
            className={`btn btn-sm ${view === "list" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setView("list")}
          >
            <i className="fas fa-th-list"></i>
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5">
          <span className="spinner-border text-success"></span>
        </div>
      )}

      {/* GRID VIEW */}
      {!loading && view === "grid" && (
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 text-center shadow-sm border-0">
                <div className="p-3" style={{ height: "150px" }}>
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="card-body">
                  <h6 className="fw-semibold">{product.name}</h6>
                  <p className="text-success fw-bold">
                    ₦{Number(product.price).toLocaleString()}
                  </p>
                  <Link
                    href={`/market-place/${product.slug}`}
                    className="btn btn-success btn-sm w-100"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {!loading && view === "list" && (
        <div className="list-group shadow-sm">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-3">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <h6 className="mb-0">{product.name}</h6>
                  <small className="text-success fw-bold">
                    ₦{Number(product.price).toLocaleString()}
                  </small>
                </div>
              </div>
              <Link
                href={`/marketplace/${product.slug}`}
                className="text-success text-decoration-none small"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && lastPage > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <button
            className="btn btn-outline-success btn-sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">
            Page {page} of {lastPage}
          </span>

          <button
            className="btn btn-outline-success btn-sm"
            disabled={page === lastPage}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
