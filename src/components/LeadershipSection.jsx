"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LeadershipSection({ members = [] }) {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      {/* ================= LEADERSHIP SECTION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Leadership</h2>
          </div>

          <div className="row text-center">
            {members.map((member) => (
              <div
                className="col-md-4 mb-4"
                key={member.id || member.name}
              >
                <div className="card border-0 shadow-sm h-100 py-4">
                  {/* Profile Image */}
                  <div className="d-flex justify-content-center mb-3">
                    <div
                      className="position-relative rounded-circle overflow-hidden"
                      style={{
                        width: "180px",
                        height: "180px",
                      }}
                    >
                      <Image
                        src={member.image || "/assets/img/profile.png"}
                        alt={member.name}
                        fill
                        sizes="180px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                      />
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <h5 className="card-title mb-1">
                      {member.name}
                    </h5>

                    <small className="text-success fw-bold d-block mb-3">
                      {member.role}
                    </small>

                    {/* Summary */}
                    <p className="card-text text-muted mb-4">
                      {member.summary}
                    </p>

                    {/* Actions */}
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => setSelectedMember(member)}
                      >
                        View Bio
                      </button>

                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-success btn-sm d-flex align-items-center gap-2"
                          aria-label={`View ${member.name}'s LinkedIn profile`}
                        >
                          <i className="fab fa-linkedin-in"></i>
                          LinkedIn
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BIO MODAL ================= */}
      {selectedMember && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedMember(null)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header mx-5">
                <div className="text-center mb-4 mb-md-0">
                    <div
                      className="position-relative overflow-hidden mx-auto container"
                      style={{
                        width: "160px",
                        height: "160px",
                      }}
                    >
                      <Image
                        src={
                          selectedMember.image ||
                          "/assets/img/profile.png"
                        }
                        alt={selectedMember.name}
                        fill
                        sizes="160px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                      />
                    </div>
                </div>

                <div className="container">
                  <h5 className="modal-title mb-1">
                    {selectedMember.name}
                  </h5>

                  <small className="text-success fw-bold">
                    {selectedMember.role}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setSelectedMember(null)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row align-items-start container">


                  <div className="col-md-12">
                    <div className="text-muted">
                        {selectedMember.bio.map((block, index) => {
                            if (block.type === "paragraph") {
                            return (
                                <p key={index} className="mb-3">
                                {block.content}
                                </p>
                            );
                            }

                            if (block.type === "heading") {
                            return (
                                <h6 key={index} className="fw-bold text-dark mt-4 mb-3">
                                {block.content}
                                </h6>
                            );
                            }

                            if (block.type === "list") {
                            return (
                                <ul key={index} className="mb-3 ps-4">
                                {block.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="mb-2">
                                    {item}
                                    </li>
                                ))}
                                </ul>
                            );
                            }

                            return null;
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {selectedMember.linkedin && (
                  <Link
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-sm"
                  >
                    <i className="fab fa-linkedin-in me-2"></i>
                    View LinkedIn Profile
                  </Link>
                )}

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedMember(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}