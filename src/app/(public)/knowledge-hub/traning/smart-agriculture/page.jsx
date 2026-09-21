"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SmartAgricultureTrainingPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const interestAreas = formData.getAll("interestAreas");

        const payload = {
            fullName: formData.get("fullName"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            gender: formData.get("gender"),
            ageBracket: formData.get("ageBracket"),
            lga: formData.get("lga"),
            community: formData.get("community"),
            position: formData.get("position"),
            organization: formData.get("organization"),
            experience: formData.get("experience"),
            agriculturalArea: formData.get("agriculturalArea"),
            farmersReached: formData.get("farmersReached"),
            challenges: formData.get("challenges"),
            agriTechnology: formData.get("agriTechnology"),
            smartphoneType: formData.get("smartphoneType"),
            interestAreas,
            expectations: formData.get("expectations"),
            consent: formData.get("consent") === "on",
        };

        try {
            const router = useRouter();
            const response = await fetch("/api/knowledge-hub/training-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to submit registration."
                );
            }

            router.push(
                "/knowledge-hub/traning/smart-agriculture/success"
            );

        } catch (error) {
            console.error(error);

            alert(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="training-page">

            {/* HERO */}
            <section className="training-hero">
                <div className="container">
                    <div className="row align-items-center g-4">

                        <div className="col-lg-7">
                            <span className="training-badge">
                                GSFN × BNARDA
                            </span>

                            <h1 className="display-4 fw-bold mt-3">
                                Smart Agriculture &amp; Digital
                                Extension Training
                            </h1>

                            <p className="lead mt-3">
                                A capacity-building initiative by{" "}
                                <strong>
                                    GoodLife Smart Farming Network (GSFN)
                                </strong>{" "}
                                in collaboration with{" "}
                                <strong>BNARDA</strong>.
                            </p>

                            <div className="training-meta mt-4">
                                <div>
                                    <small>Registration Deadline</small>
                                    <strong>1st October, 2026</strong>
                                </div>

                                <div>
                                    <small>Training Focus</small>
                                    <strong>Smart &amp; Digital Agriculture</strong>
                                </div>
                            </div>

                            {/* <div className="registration-card">
                                <div className="text-center mb-4">
                                    <div className="registration-icon">
                                        <i className="bi bi-person-plus-fill"></i>
                                    </div>

                                    <h3 className="fw-bold mt-3">
                                        Register for the Training
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Complete the form below to register your
                                        interest.
                                    </p>
                                </div>

                                <div className="deadline-box">
                                    <small>Registration closes</small>
                                    <strong>1st October, 2026</strong>
                                </div>
                            </div> */}
                        </div>

                        <div className="col-lg-5">

                            <div className="training-flyer-wrapper">
                                <img
                                    src="/assets/img/smart-agriculture-training.png"
                                    alt="Smart Agriculture and Digital Extension Training"
                                    className="training-flyer"
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* WHAT YOU'LL LEARN */}
            <section className="learning-section">
                <div className="container">

                    <div className="section-heading text-center">
                        <span>WHAT YOU'LL LEARN</span>
                        <h2>
                            Practical Skills for Modern Agriculture
                        </h2>
                        <p>
                            The training is designed to help agricultural
                            professionals and extension practitioners leverage
                            technology to improve their work and reach.
                        </p>
                    </div>

                    <div className="row g-3 mt-4">

                        {[
                            "Smart Farming & Precision Agriculture",
                            "Market Access & Digital Agriculture",
                            "Farm Data & Digital Record Keeping",
                            "Climate-Smart Agriculture",
                        ].map((item, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="learning-card">
                                    <span>
                                        <i className="bi bi-check-lg"></i>
                                    </span>
                                    <p>{item}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* REGISTRATION FORM */}
            <section className="registration-section">
                <div className="container">

                    <div className="form-wrapper">

                        <div className="form-heading">
                            <span>STEP 01</span>
                            <h2>Participant Registration</h2>
                            <p>
                                Please provide accurate information to help us
                                properly prepare for the training.
                            </p>
                        </div>

                        
                        <form onSubmit={handleSubmit}>

                            {/* PERSONAL INFORMATION */}
                            <div className="form-section">
                                <div className="form-section-title">
                                    <span>01</span>
                                    <div>
                                        <h5>Personal Information</h5>
                                        <p>Your basic contact information</p>
                                    </div>
                                </div>

                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Full Name <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Phone / WhatsApp Number <span>*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            placeholder="+234 800 000 0000"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Email Address <span>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Gender <span>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Age Bracket <span>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="ageBracket"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="18-24">18–24</option>
                                            <option value="25-34">25–34</option>
                                            <option value="35-44">35–44</option>
                                            <option value="45-54">45–54</option>
                                            <option value="55+">55+</option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            {/* LOCATION */}
                            <div className="form-section">

                                <div className="form-section-title">
                                    <span>02</span>
                                    <div>
                                        <h5>Location</h5>
                                        <p>Tell us where you are based</p>
                                    </div>
                                </div>

                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            LGA <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lga"
                                            placeholder="Enter your LGA"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Ward / Community <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="community"
                                            placeholder="Enter your ward or community"
                                            required
                                        />
                                    </div>

                                </div>
                            </div>


                            {/* PROFESSIONAL INFORMATION */}
                            <div className="form-section">

                                <div className="form-section-title">
                                    <span>03</span>
                                    <div>
                                        <h5>Professional &amp; Agricultural Experience</h5>
                                        <p>Help us understand your current role</p>
                                    </div>
                                </div>

                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Current Role / Position <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="position"
                                            placeholder="e.g. Agricultural Extension Officer"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Organization / Agency
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="organization"
                                            placeholder="Enter organization or agency"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Years of Agricultural Experience <span>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="experience"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="less-than-1">
                                                Less than 1 year
                                            </option>
                                            <option value="1-3">1–3 years</option>
                                            <option value="4-6">4–6 years</option>
                                            <option value="7-10">7–10 years</option>
                                            <option value="10+">More than 10 years</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Area of Agricultural Work <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="agriculturalArea"
                                            placeholder="e.g. Extension, Crop Production"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Number of Farmers Currently Reached / Supported
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            name="farmersReached"
                                            placeholder="e.g. 150"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Current Challenges in Agricultural Extension
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="challenges"
                                            rows="4"
                                            placeholder="Briefly describe the major challenges you currently face..."
                                        ></textarea>
                                    </div>

                                </div>
                            </div>


                            {/* TECHNOLOGY */}
                            <div className="form-section">

                                <div className="form-section-title">
                                    <span>04</span>
                                    <div>
                                        <h5>Technology Experience</h5>
                                        <p>Tell us about your current use of technology</p>
                                    </div>
                                </div>

                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <label className="form-label d-block">
                                            Have you used any agricultural
                                            technology before? <span>*</span>
                                        </label>

                                        <div className="radio-group">

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="agriTechnology"
                                                    value="yes"
                                                    required
                                                />
                                                <span>Yes</span>
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="agriTechnology"
                                                    value="no"
                                                />
                                                <span>No</span>
                                            </label>

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Smartphone Type <span>*</span>
                                        </label>

                                        <select
                                            className="form-select"
                                            name="smartphoneType"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="android">Android</option>
                                            <option value="iphone">iPhone</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            {/* INTEREST AREAS */}
                            <div className="form-section">

                                <div className="form-section-title">
                                    <span>05</span>
                                    <div>
                                        <h5>Areas of Interest</h5>
                                        <p>Select the areas you are most interested in</p>
                                    </div>
                                </div>

                                <div className="interest-grid">

                                    {[
                                        "Smart farming",
                                        "AI for agriculture",
                                        "Farm data",
                                        "Market access",
                                        "Digital extension",
                                        "IoT / precision farming",
                                        "Agricultural finance",
                                    ].map((interest) => (
                                        <label
                                            className="interest-option"
                                            key={interest}
                                        >
                                            <input
                                                type="checkbox"
                                                name="interestAreas"
                                                value={interest}
                                            />
                                            <span>
                                                <i className="bi bi-check"></i>
                                            </span>
                                            {interest}
                                        </label>
                                    ))}

                                </div>

                            </div>


                            {/* EXPECTATIONS */}
                            <div className="form-section">

                                <div className="form-section-title">
                                    <span>06</span>
                                    <div>
                                        <h5>Your Expectations</h5>
                                        <p>Tell us what you hope to gain</p>
                                    </div>
                                </div>

                                <label className="form-label">
                                    What do you expect to learn from the training?
                                    <span>*</span>
                                </label>

                                <textarea
                                    className="form-control"
                                    name="expectations"
                                    rows="5"
                                    placeholder="Tell us what you would like to learn or achieve..."
                                    required
                                ></textarea>

                            </div>


                            {/* CONSENT */}
                            <div className="consent-box">

                                <label>
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        required
                                    />

                                    <span>
                                        I consent to receive relevant GSFN /
                                        SFM updates, announcements and training
                                        information through email and/or WhatsApp.
                                    </span>
                                </label>

                            </div>


                            {/* SUBMIT */}
                            <div className="submit-area">

                                <button
                                    type="submit"
                                    className="btn btn-register"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Registration
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </>
                                    )}
                                </button>

                                <p>
                                    By submitting this form, you confirm that the
                                    information provided is accurate.
                                </p>

                            </div>

                        </form>

                    </div>
                </div>
            </section>


            {/* FOOTER CTA */}
            <section className="training-footer">
                <div className="container text-center">

                    <h3>
                        Smart Agriculture. Digital Innovation.
                        Better Extension.
                    </h3>

                    <p>
                        GoodLife Smart Farming Network (GSFN)
                    </p>

                    <div className="contact-info">
                        <Link href="tel:+2349121881781">
                            <i className="bi bi-telephone-fill"></i>
                            +234 (0) 912 188 1781
                        </Link>

                        <Link href="mailto:admin@smartfarmingnetwork.com">
                            <i className="bi bi-envelope-fill"></i>
                            admin@smartfarmingnetwork.com
                        </Link>
                    </div>

                </div>
            </section>

        </main>
    );
}