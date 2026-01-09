export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <div className="container py-5">
        {/* Page Heading */}
        <div className="site-heading text-center mb-5">
          <h2 className="title">About Us</h2>
        </div>

        {/* ===== Our Project ===== */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-5">
            <div className="site-heading text-center text-lg-start">
              <h5 className="sub-title">Our Project</h5>
              <h2 className="title">
                Goodlife Smart Farming Network (SFN)
              </h2>
            </div>
          </div>

          <div className="col-lg-7">
            <p>
              The Goodlife Smart Farming Network (SFN) is a revolutionary
              digital ecosystem built to transform agriculture across Africa
              through technology, connectivity, and knowledge. At its core is
              AgriGo—an intelligent chatbot assistant designed to engage farmers
              in a personal, data-driven way, delivering timely farm updates,
              smart insights, and expert guidance through a simple chat
              experience.
            </p>
            <p>
              From crop tracking to climate alerts and market access, SFN
              empowers farmers to make informed decisions, improve yields, and
              participate confidently in modern agricultural value chains. SFN
              bridges rural farming communities with digital innovation—turning
              farming into a sustainable and prosperous lifestyle.
            </p>
          </div>
        </div>

        {/* ===== Vision ===== */}
        <div className="bg-gray py-5 mb-5 rounded">
          <div className="text-center mb-4">
            <h5 className="sub-title">Our Vision</h5>
            <h2 className="title">The Future of African Farming</h2>
          </div>

          <div className="container">
            <p className="fs-5 text-center">
              “Redefining and revolutionizing the traditional method of farming
              across the African continent.”
              <br />
              <br />
              With Goody.AI in every farmer&apos;s pocket and SFN as the bridge,
              this vision is not futuristic—it is already unfolding.
              <br />
              <br />
              <strong>Goodlife Smart Farming Network</strong>
              <br />
              Tagline: <em>&quot;The Amazon of Africa&apos;s Farming&quot;</em>
            </p>
          </div>
        </div>

        {/* ===== Our Team ===== */}
        <div className="row mb-5">
          <div className="col-lg-5">
            <div className="site-heading text-center text-lg-start">
              <h5 className="sub-title">Our Team</h5>
              <h2 className="title">People Behind the Vision</h2>
            </div>
          </div>

          <div className="col-lg-7">
            <p>
              SFN is powered by a growing team of technologists, agricultural
              thinkers, creatives, and purpose-driven leaders committed to
              solving real-world problems in African agriculture. Our approach
              combines innovation, ethics, and deep cultural understanding to
              build solutions that truly serve farmers and communities.
            </p>
            <p>
              As the network expands, SFN continues to collaborate with
              partners, advisors, and local champions who share a common belief:
              Africa’s land and people hold untapped potential—and technology
              can unlock it responsibly.
            </p>
          </div>
        </div>

        {/* ===== About the Founder (Commented for Future Use) ===== */}
        {/*
        <div className="row mt-5">
          <div className="col-lg-5">
            <div className="site-heading text-center text-lg-start">
              <h5 className="sub-title">About the Founder</h5>
              <h2 className="title">Edward Terungwa Ordams</h2>
            </div>
          </div>

          <div className="col-lg-7">
            <p>
              Edward Terungwa Ordams is more than a tech visionary—he is a bridge
              between purpose and progress. A Christian leader, philosopher, and
              entrepreneur, he is the founder of The Goodlife Company, a parent
              venture focused on purpose-driven innovation across agriculture,
              food, and lifestyle sectors.
            </p>
            <p>
              As the creator of the Smart Farming Network, Edward believes that
              Africa&apos;s true wealth lies in its land and people—and that
              digital intelligence can reshape farming for generations to come.
            </p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
