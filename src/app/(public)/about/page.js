import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div>
      {/* ================= VISION SECTION ================= */}
      <section className="bg-white min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="site-heading text-center mb-4">
            <h2 className="title">Our Vision</h2>
          </div>

          <p className="fs-5 text-center">
            “Redefining and revolutionizing the traditional method of farming
            across the African continent.”
            <br />
            <br />
            With Goody.AI in every farmer&apos;s pocket and SFN as the bridge,
            this vision is not futuristic — it is already here.
            <br />
            <br />
            <strong>Goodlife Smart Farming Network</strong>
            <br />
            <em>&quot;The Amazon of Africa&apos;s Farming&quot;</em>
          </p>
        </div>
      </section>

      {/* ================= OUR TEAM SECTION ================= */}
      {/* ================= OUR TEAM SECTION ================= */}
      <section className="bg-gray min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h2 className="title">Our Team</h2>
          </div>

          <div className="row text-center">
            {[
              {
                name: "Edward Terungwa Ordams",
                role: "Founder & Vision Lead",
              },
              {
                name: "Project Manager",
                role: "Operations & Delivery",
              },
              {
                name: "Engineering Team",
                role: "Web, AI & IoT",
              },
              {
                name: "Secretary",
                role: "Admin & Communications",
              },
            ].map((member, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card border-0 shadow-sm h-100 py-4">

                  {/* Profile Image */}
                  <div className="d-flex justify-content-center mb-3">
                    <div
                      className="position-relative rounded-circle overflow-hidden"
                      style={{ width: "180px", height: "180px" }}
                    >
                      <Image
                        src="/assets/img/profile.png"
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                  </div>

                  {/* Content */}
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
      <section className="bg-white min-vh-100 d-flex align-items-center">
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
                  "An intelligent farming assistant providing insights, alerts, and guidance through conversational AI.",
                link: "/projects/agrigo",
              },
              {
                title: "IoT Smart Farming",
                image: "/assets/img/smart_farm.jpg",
                description:
                  "Real-time soil, weather, and crop monitoring using IoT devices for precision farming.",
                link: "/projects/iot",
              },
              {
                title: "Digital Market Access",
                image: "/assets/img/smart_farm.jpg",
                description:
                  "Connecting farmers directly to verified buyers, improving transparency and profitability.",
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
