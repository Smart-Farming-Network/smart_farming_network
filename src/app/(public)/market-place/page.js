'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MarketPlacePage() {
  const [view, setView] = useState("grid");
  const [activeCategory, setActiveCategory] = useState(""); // ← no default filter

  const categories = ["Seeds", "Tools", "Produce", "Fertilizers"];

  const products = [
    { id: 1, name: "Maize (100kg)", price: 80000, image: "/assets/img/products/1.png", category: "Seeds" },
    { id: 2, name: "Irrigation Kit", price: 300000, image: "/assets/img/products/2.png", category: "Tools" },
    { id: 3, name: "Organic Fertilizer", price: 100000, image: "/assets/img/products/3.png", category: "Fertilizers" },
    { id: 4, name: "Sprayer", price: 60000, image: "/assets/img/products/4.png", category: "Tools" },
  ];

  // Filter only when category is selected
  const filteredProducts = activeCategory
    ? products.filter(p => p.category === activeCategory)
    : products;

  return (
    <div className="container py-5">
      <div className="breadcrumb-area text-center shadow dark-hard bg-cover text-light" style={{ backgroundImage: "url('/assets/img/4.jpeg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>Products</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link href="/"><i className="fas fa-home"></i> Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Shop</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>


      {/* Category Tabs */}
      <ul className="nav nav-pills navbar-brand mb-4 mt-4">
        {categories.map(cat => (
          <li className="nav-item" key={cat}>
            <button
              className={`nav-link ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(activeCategory === cat ? "" : cat)} // toggle off if clicked again
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Filters and View Toggle */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div className="d-flex gap-2">
          <select className="form-select form-select-sm" style={{ minWidth: "150px" }}>
            <option>Location</option>
          </select>
          <select className="form-select form-select-sm" style={{ minWidth: "150px" }}>
            <option>Product type</option>
          </select>
        </div>

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

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="row g-4">
          {filteredProducts.map((item) => (
            <div key={item.id} className="col-6 col-md-4 col-lg-3">
              <div className="card product-card h-100 text-center border-0 shadow-sm">
                <div className="card-img-top d-flex justify-content-center align-items-center p-3" style={{ height: "150px" }}>
                  <Image src={item.image} alt={item.name} width={120} height={120} className="img-fluid" />
                </div>
                <div className="card-body">
                  <h6 className="card-title fw-semibold">{item.name}</h6>
                  <p className="text-success fw-bold mb-3">₦{item.price.toLocaleString()}</p>
                  <button className="btn btn-success btn-sm w-100">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="list-group shadow-sm">
          {filteredProducts.map(item => (
            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0 fw-semibold">{item.name}</h6>
                <small className="text-success fw-bold">₦{item.price.toLocaleString()}</small>
              </div>
              <Link href="#" className="text-success small text-decoration-none">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
