import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div>
      {/* ================= PAGE METADATA ================= */}
      {/* Page Title: About GSFN | GoodLife Smart Farming Network */}
      {/* Meta Description: Digital infrastructure for profitable African farming. GSFN connects farmers, technology, and markets through FarmVerse - our unified agritech ecosystem. */}

      {/* ================= HERO SECTION ================= */}
      <section className="bg-dark text-white py-5 text-center position-relative overflow-hidden" style={{ minHeight: "500px", display: "flex", alignItems: "center" }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: "url('/assets/img/hero-african-farming.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.3 }}></div>
        
        <div className="container position-relative z-1">
          <h1 className="display-3 fw-bold mb-4">Building the Digital Infrastructure for Profitable African Farming</h1>
          <p className="fs-5 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            GSFN is building technology, systems and networks that make farming more connected, informed, efficient and commercially viable for African farmers.
          </p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/farmverse" className="btn btn-success btn-lg">
              Explore FarmVerse →
            </Link>
            <Link href="/contact" className="btn btn-outline-light btn-lg">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE SECTION ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">We Are Building the Future of African Farming</h2>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="fs-5 mb-3">
                <strong>GoodLife Smart Farming Network (GSFN)</strong> is an agritech company building digital infrastructure for profitable African farming.
              </p>
              
              <p className="fs-5 mb-3">
                We combine technology, agricultural knowledge, farmer networks, market intelligence and smart farming solutions to help farmers make better decisions, manage their farms more effectively and participate more profitably in the agricultural value chain.
              </p>

              <h4 className="fw-bold mt-4 mb-3">Our Approach</h4>
              <ul className="fs-5">
                <li className="mb-2"><strong>Design</strong> better systems.</li>
                <li className="mb-2"><strong>Organize</strong> agricultural activity.</li>
                <li className="mb-2"><strong>Optimize</strong> resources and decisions.</li>
                <li className="mb-2"><strong>Scale</strong> profitable farming.</li>
              </ul>

              <p className="fs-5 mt-4">
                <em>GSFN is not simply building another farming app. We are building an ecosystem designed to connect the fragmented pieces of African agriculture.</em>
              </p>
            </div>

            <div className="col-lg-6 text-center">
              <Image 
                src="/assets/img/gsfn-ecosystem.jpg" 
                alt="GSFN Agricultural Ecosystem" 
                width={500} 
                height={400} 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE PILLARS SECTION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Core Framework: DESIGN → ORGANIZE → OPTIMIZE → SCALE</h2>
          </div>

          <div className="row">
            {[
              {
                icon: "🎨",
                title: "DESIGN",
                description: "We design practical systems, tools and experiences around the realities of African agriculture.",
              },
              {
                icon: "📊",
                title: "ORGANIZE",
                description: "We organize fragmented agricultural information, farmers, resources and opportunities into connected systems.",
              },
              {
                icon: "⚡",
                title: "OPTIMIZE",
                description: "We use technology, data and intelligence to help farmers make better decisions and use resources more efficiently.",
              },
              {
                icon: "📈",
                title: "SCALE",
                description: "We create infrastructure that allows successful farming models, businesses and opportunities to grow across communities and markets.",
              },
            ].map((pillar, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card h-100 border-0 shadow-sm text-center py-4">
                  <div className="fs-1 mb-3">{pillar.icon}</div>
                  <h5 className="card-title fw-bold">{pillar.title}</h5>
                  <p className="card-text fs-6">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR VISION ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="title mb-4">Our Vision</h2>
              <p className="fs-5 mb-3">
                To build a future where every African farmer can access the information, technology, markets and opportunities required to farm profitably and sustainably.
              </p>
              <ul className="fs-5 list-unstyled">
                <li className="mb-3">✓ Access to real-time agricultural data and intelligence</li>
                <li className="mb-3">✓ Connection to reliable markets and buyers</li>
                <li className="mb-3">✓ Adoption of modern farming technologies</li>
                <li>✓ Participation in a profitable value chain</li>
              </ul>
            </div>
            <div className="col-lg-6 text-center">
              <Image 
                src="/assets/img/vision-farming.jpg" 
                alt="Our Vision" 
                width={400} 
                height={300} 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR MISSION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <h2 className="title mb-4">Our Mission</h2>
              <p className="fs-5 mb-3">
                To empower farmers and agricultural businesses with digital tools, intelligent data, connected markets and practical farming solutions that improve productivity, profitability and resilience.
              </p>
              <p className="fs-5 fw-semibold">
                We build the backbone that transforms African agriculture from fragmented effort into coordinated, data-driven success.
              </p>
            </div>
            <div className="col-lg-6 order-lg-1 text-center mb-4 mb-lg-0">
              <Image 
                src="/assets/img/mission-farming.jpg" 
                alt="Our Mission" 
                width={400} 
                height={300} 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FARMVERSE SECTION ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Meet FarmVerse</h2>
            <p className="fs-5 text-muted">Your Digital Farming Ecosystem</p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <p className="fs-5 mb-3">
                <strong>FarmVerse</strong> is the digital platform powering the GSFN ecosystem. It is designed to give farmers and agricultural stakeholders a connected digital environment for managing farms, accessing agricultural knowledge, monitoring market opportunities, discovering services and participating in the agricultural marketplace.
              </p>

              <h5 className="fw-bold mb-3">Platform Capabilities:</h5>
              <ul className="fs-6 list-unstyled">
                <li className="mb-2">✓ Farmer profiles & farm management</li>
                <li className="mb-2">✓ Crop records & farm activities tracking</li>
                <li className="mb-2">✓ Agricultural knowledge library</li>
                <li className="mb-2">✓ Weather intelligence & analytics</li>
                <li className="mb-2">✓ Market prices & opportunities</li>
                <li className="mb-2">✓ Agricultural marketplace & services</li>
                <li className="mb-2">✓ Farmer community & networking</li>
                <li className="mb-2">✓ AI-powered assistance through Edna</li>
              </ul>

              <Link href="/farmverse" className="btn btn-success btn-lg mt-4">
                Explore FarmVerse →
              </Link>
            </div>

            <div className="col-lg-6 text-center">
              <Image 
                src="/assets/img/farmverse-platform.jpg" 
                alt="FarmVerse Platform" 
                width={400} 
                height={400} 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY WE EXIST SECTION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Why We Exist</h2>
          </div>

          <div className="row mb-4">
            <div className="col-lg-8 offset-lg-2">
              <p className="fs-5 text-center mb-4">
                African agriculture faces structural challenges that limit farmer profitability and scale. GSFN exists to solve these problems:
              </p>
            </div>
          </div>

          <div className="row">
            {[
              "Fragmented agricultural information",
              "Limited access to reliable market intelligence",
              "Poor farm record keeping & documentation",
              "Limited access to modern technology",
              "Difficulty connecting farmers with buyers",
              "Limited visibility into market opportunities",
              "Inefficient resource allocation",
              "Youth disengagement from modern agriculture",
              "Poor coordination across agricultural value chains",
            ].map((problem, index) => (
              <div className="col-md-6 col-lg-4 mb-3" key={index}>
                <div className="d-flex gap-3">
                  <div className="text-danger fs-5">●</div>
                  <p className="fs-6">{problem}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h5 className="fw-bold mb-3">Our Solution</h5>
              <p className="fs-5">
                GSFN connects these fragmented pieces through technology and organized networks. We build the infrastructure that allows African farmers to operate inside one intelligent, coordinated system — where information flows freely, markets are accessible, and profitability is achievable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR APPROACH TO TECHNOLOGY ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Approach to African Agriculture</h2>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="bg-light p-5 rounded" style={{ borderLeft: "5px solid #28a745" }}>
                <p className="fs-4 fw-bold text-center mb-0">
                  "Technology should not take the farmer out of farming. <br /> It should make the farmer better at farming."
                </p>
              </div>

              <p className="fs-5 mt-4">
                We position farmers as the central actors in our ecosystem. Technology provides:
              </p>
              <ul className="fs-5">
                <li className="mb-2"><strong>Intelligence</strong> — Data-driven insights</li>
                <li className="mb-2"><strong>Connectivity</strong> — Access to markets and networks</li>
                <li className="mb-2"><strong>Organization</strong> — Structured processes and systems</li>
                <li className="mb-2"><strong>Efficiency</strong> — Better resource utilization</li>
              </ul>
            </div>

            <div className="col-lg-6 text-center">
              <Image 
                src="/assets/img/farmer-technology.jpg" 
                alt="Farmer Using Technology" 
                width={400} 
                height={300} 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SMART FARMING & INNOVATION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Smart Farming & Innovation</h2>
          </div>

          <p className="fs-5 text-center mb-5">
            GSFN is building the technological foundation for the future of African agriculture:
          </p>

          <div className="row">
            {[
              { title: "Live", items: ["Farm monitoring systems", "Digital farm records", "Market price intelligence"] },
              { title: "Pilot", items: ["Smart irrigation systems", "Precision agriculture tools", "Crop yield prediction"] },
              { title: "In Development", items: ["AI agricultural assistance (Edna)", "IoT sensor networks", "Blockchain traceability"] },
              { title: "Planned", items: ["Connected agricultural marketplaces", "Advanced climate adaptation tools", "Predictive financing models"] },
            ].map((stage, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">{stage.title}</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      {stage.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="mb-2 fs-6">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR ECOSYSTEM ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Ecosystem</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-light p-4 rounded border border-success" style={{ textAlign: "center" }}>
                <p className="mb-3"><strong>FARMERS</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>FARMS</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>DATA + KNOWLEDGE</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>MARKETS</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>BUYERS</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>SUPPLIERS</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>SERVICES</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-3"><strong>FINANCE</strong></p>
                <p className="mb-3">↓</p>
                <p className="mb-0"><strong>OPPORTUNITIES</strong></p>

                <hr className="my-4" />

                <p className="fw-bold">All connected through:</p>
                <p className="fw-bold fs-5">
                  <span className="bg-success text-white px-3 py-2 rounded">GSFN / FARMVERSE</span>
                </p>
              </div>

              <p className="fs-5 text-center mt-4">
                <em>This visually communicates that GSFN is building infrastructure rather than a single isolated application.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Values</h2>
          </div>

          <div className="row">
            {[
              { title: "Track Record", description: "Verified performance." },
              { title: "Integrity", description: "Transparency at every layer." },
              { title: "Excellence", description: "Standardized systems." },
              { title: "Trust", description: "Structured accountability." },
            ].map((value, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card h-100 border-0 shadow-sm text-center py-4">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{value.title}</h5>
                    <p className="card-text">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="fs-5 fw-semibold">
              Premium agricultural coordination made accessible.
            </p>
          </div>
        </div>
      </section>

      {/* ================= COMPANY STORY / TIMELINE ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Journey</h2>
            <p className="text-muted">Only verified milestones are included</p>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="timeline">
                {[
                  { year: "2024", title: "Company Formation", description: "GoodLife Smart Farming Network Ltd officially established." },
                  { year: "2024", title: "Farmer Network Development", description: "Began onboarding and verification of agricultural partners." },
                  { year: "2025", title: "FarmVerse Development", description: "Digital platform development and pilot programs launched." },
                  { year: "2025-2026", title: "Smart Farming Deployments", description: "IoT and precision agriculture systems deployment across pilot regions." },
                ].map((milestone, index) => (
                  <div key={index} className="d-flex gap-4 mb-4">
                    <div style={{ minWidth: "100px" }}>
                      <h6 className="fw-bold text-success">{milestone.year}</h6>
                    </div>
                    <div className="flex-grow-1 pb-4" style={{ borderLeft: "3px solid #28a745", paddingLeft: "20px" }}>
                      <h5 className="fw-bold">{milestone.title}</h5>
                      <p className="text-muted mb-0">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP SECTION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Leadership</h2>
          </div>

          <div className="row text-center">
            {[
              {
                name: "Edward Terungwa Ordams",
                role: "Founder & Vision Lead",
                image: "/assets/img/founder.jpg",
                bio: "Visionary leader driving GSFN's mission to transform African agriculture through technology and organized infrastructure.",
              },
              {
                name: "Grace Onahi Odeh",
                role: "Operations & HR Director",
                image: "/assets/img/operations-director.jpg",
                bio: "Leads operations and human capital development, ensuring organizational excellence and team alignment.",
              },
              {
                name: "Nathaniel Egbodo",
                role: "Lead Tech Engineer",
                image: "/assets/img/lead-engineer.png",
                bio: "Directs technical architecture and innovation, building the digital infrastructure powering FarmVerse.",
              },
            ].map((member, index) => (
              <div className="col-md-4 mb-4" key={index}>
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
                    <small className="text-success fw-bold d-block mb-2">{member.role}</small>
                    <p className="card-text text-muted">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARTNERSHIPS SECTION ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Strategic Partnerships</h2>
            <p className="text-muted">Building the future of African agriculture through verified partnerships</p>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="card border-0 shadow-sm p-5 text-center bg-light">
                <p className="fs-5 mb-0">
                  GSFN partners with organizations that share our commitment to transforming African agriculture. 
                  <br /><br />
                  <strong>Verified partnerships only. None currently listed.</strong>
                </p>
                <p className="text-muted mt-3 mb-0">
                  Interested in partnering with GSFN? <Link href="/contact" className="text-success fw-bold">Get in touch</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PROJECTS SECTION ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Projects</h2>
          </div>

          <div className="row">
            {[
              {
                title: "AgriGo AI Assistant (Edna)",
                image: "/assets/img/smart_farm.jpg",
                description:
                  "A production intelligence layer providing real-time insights, decision support, alerts, and predictive guidance across the GSFN farming ecosystem.",
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
                <div className="card h-100 shadow-sm border-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text fs-6">{project.description}</p>

                    <Link
                      href={project.link}
                      className="btn btn-success btn-sm"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-success text-white py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Join the Agricultural Revolution</h2>
          <p className="fs-5 mb-4">
            Be part of GSFN's mission to transform African farming through technology, organization, and scale.
          </p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/farmverse" className="btn btn-light btn-lg">
              Explore FarmVerse
            </Link>
            <Link href="/contact" className="btn btn-outline-light btn-lg">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
