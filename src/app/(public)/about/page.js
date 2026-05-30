import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div>
      {/* ================= ABOUT SECTION ================= */}
      <section className="bg-white min-vh-100 d-flex align-items-center">
        <div className="container">

          <div className="site-heading text-center mb-4">
            <h2 className="title">About Us</h2>
          </div>

          <h3 className="text-center fw-bold mb-4">
            BUILDING THE INFRASTRUCTURE BEHIND AFRICAN AGRICULTURE.
          </h3>

          <p className="fs-5 text-center">
            The future of farming in Africa will not be built on guesswork.
            It will be built on systems.
            <br /><br />
            Smart Farming Network (SFN) is a technology-driven agricultural
            infrastructure platform designed to organize, optimize, and scale
            farming across Africa.
            <br /><br />
            We are not just connecting farmers.
            We are structuring production.
            We are engineering predictability.
            We are transforming agriculture into a measurable asset class.
            <br /><br />
            SFN exists to move African agriculture from fragmented effort to coordinated intelligence.
          </p>

        </div>
      </section>

      {/* ================= OUR VISION ================= */}
      <section className="bg-gray py-5">
        <div className="container">
          <div className="site-heading text-center mb-4">
            <h2 className="title">Our Vision</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 text-center fs-5">
              <p>
                To become the digital infrastructure powering agricultural
                production and trade across Africa — a trusted backbone
                connecting farmers, investors, processors, and markets in one
                intelligent ecosystem.
              </p>

              <ul className="list-unstyled mt-3">
                <li>Farmers operate with real-time data</li>
                <li>Investors deploy capital with transparency</li>
                <li>Markets receive consistent and traceable supply</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ================= OUR MISSION ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-4">
            <h2 className="title">Our Mission</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 text-center fs-5">
              <p>To build a unified smart farming ecosystem powered by:</p>

              <ul className="list-unstyled mt-3">
                <li>Data intelligence</li>
                <li>Greenhouse & precision agriculture systems</li>
                <li>Blockchain-enabled traceability</li>
                <li>Aggregated production clusters</li>
                <li>Market integration</li>
              </ul>

              <p className="fw-semibold mt-3">
                We transform land into a structured opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= WHAT WE DO ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">What We Do</h2>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4 fs-5">
              <h5 className="fw-bold">1. Smart Farm Infrastructure Development</h5>
              <p>
                We design and coordinate controlled environment farms and structured
                farm clusters operating under one intelligent system.
              </p>

              <h5 className="fw-bold">2. Data & Technology Integration</h5>
              <p>
                From soil analysis to yield forecasting and pricing intelligence,
                SFN integrates technology across every production layer.
              </p>
              <p className="fw-semibold">
                Data → Soil → Production → Aggregation → Market → Profit.
              </p>
            </div>

            <div className="col-md-6 mb-4">
              <h5 className="fw-bold">3. Aggregated Farmer Network</h5>
              <p>
                We onboard and verify farmers based on performance, integrity,
                and excellence — building a credible supply network markets can trust.
              </p>

              <h5 className="fw-bold">4. Investor & Market Access</h5>
              <p>
                We create a transparent bridge between farmers, investors,
                and off-takers — making farming a coordinated commerce system.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= WHY SFN MATTERS ================= */}
      <section className="bg-gray py-5">
        <div className="container fs-5">
          <div className="site-heading text-center mb-4">
            <h2 className="title">Why SFN Matters</h2>
          </div>

          <p className="text-center">
            Africa has fertile land.
            Africa has hardworking farmers.
            But fragmentation creates inefficiency.
          </p>

          <ul className="text-center list-unstyled">
            <li>Market volatility</li>
            <li>Poor price negotiation</li>
            <li>Supply inconsistency</li>
            <li>Limited scalability</li>
          </ul>

          <p className="text-center">
            SFN solves this by building one intelligent infrastructure
            across multiple farms and states — where thousands of farmers
            operate inside one coordinated system.
          </p>
        </div>
      </section>


      {/* ================= VALUES ================= */}
      <section className="bg-white py-5">
        <div className="container text-center fs-5">
          <h2 className="title mb-4">Our Values</h2>

          <div className="row">
            <div className="col-md-3 mb-3"><strong>Track Record</strong><br />Verified performance.</div>
            <div className="col-md-3 mb-3"><strong>Integrity</strong><br />Transparency at every layer.</div>
            <div className="col-md-3 mb-3"><strong>Excellence</strong><br />Standardized systems.</div>
            <div className="col-md-3 mb-3"><strong>Trust</strong><br />Structured accountability.</div>
          </div>

          <p className="mt-4 fw-semibold">
            Premium agricultural coordination made accessible.
          </p>
        </div>
      </section>


      {/* ================= OUR TEAM ================= */}
      <section className="bg-gray py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Team</h2>
          </div>

          <div className="row text-center">
            {[
              {
                name: "Edward Terungwa Ordams",
                role: "Founder & Vision Lead",
                image: "/assets/img/founder.jpg",
              },
              {
                name: "Grace Onahi Odeh",
                role: "Operations & HR Director",
                image: "/assets/img/project_manager.jpg",
              },
              {
                name: "Esther Iyoo",
                role: "Project Manager",
                image: "",
              },
              {
                name: "Nathaniel Egbodo",
                role: "Lead Tech Engineer",
                image: "/assets/img/lead-engineer.png",
              },
            ].map((member, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card border-0 shadow-sm h-100 py-4">
                  <div className="d-flex justify-content-center mb-3">
                    <div
                      className="position-relative rounded-circle overflow-hidden"
                      style={{ width: "180px", height: "180px" }}
                    >
                      <Image
                        src={member.image || "/assets/img/profile.png"}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <h5 className="card-title mb-1">{member.name}</h5>
                    <small className="text-muted">{member.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR PROJECTS SECTION ================= */}
      <section className="bg-white py-5">
        <div className="container mt-5">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Projects</h2>
          </div>

          <div className="row">
            {[
              {
                title: "AgriGo AI Assistant",
                image: "/assets/img/smart_farm.jpg",
                description:
                  "A production intelligence layer providing real-time insights, decision support, alerts, and predictive guidance across the SFN farming ecosystem.",
                link: "/projects/agrigo",
              },
              {
                title: "IoT Smart Farming Infrastructure",
                image: "/assets/img/farm-project.jpeg",
                description:
                  "Sensor-driven soil, climate, and crop monitoring integrated into a unified control system for precision farming and yield optimization at scale.",
                link: "/project-farm-100",
              },
              {
                title: "Digital Market & Trade Network",
                image: "/assets/img/smart_farm.jpg",
                description:
                  "A structured commerce engine connecting verified production clusters to investors and off-takers with transparency, traceability, and measurable output.",
                link: "/projects/marketplace",
              },
            ].map((project, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>

                    <Link
                      href={project.link}
                      className="btn btn-outline-success btn-sm"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}