'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if (typeof window !== "undefined" && window.Swiper) {

      new window.Swiper(".banner-fade", {
        direction: "horizontal",
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        fadeEffect: { crossFade: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: '.banner-pagination',
          clickable: true,
        },
      });

      new window.Swiper(".event-carousel", {
        loop: true,
        autoplay: {
          delay: 20000,
          disableOnInteraction: false,
        },
        speed: 900,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      galleryEvents.forEach((event) => {
        new window.Swiper(`.gallery-swiper-${event.id}`, {
          loop: true,
          navigation: {
            nextEl: `.gallery-next-${event.id}`,
            prevEl: `.gallery-prev-${event.id}`,
          },
        });
      });

    }

    const counters = document.querySelectorAll(".stat-number");

    const animateCounters = () => {
      counters.forEach(counter => {

        const target = +counter.getAttribute("data-count");
        const suffix = counter.getAttribute("data-suffix") || "";

        let current = 0;
        const increment = target / 80;

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            counter.innerText = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target + suffix;
          }
        };

        updateCounter();
      });
    };

    // Scroll animations
    const animatedElements = document.querySelectorAll(".transform-el");

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    animatedElements.forEach((el) => {
      animationObserver.observe(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.querySelector(".impact-stats-area");
    if (section) observer.observe(section);

  }, []);

  const galleryEvents = [
    {
      id: 1,
      title: "Training Women in Tech & Business",
      description: "In partnership with Yonash Skill Empowerment Services, we conducted a capacity-building session focused on empowering women with practical knowledge in technology and business.",
      cover: "/assets/img/gallery/1.jpeg",
      images: [
        "/assets/img/gallery/1.jpeg",
        "/assets/img/gallery/2.jpeg",
      ],
    },

    {
      id: 2,
      title: "Own or Co-Own a Smart Farm",
      description: "Through Goodlife Smart Farming Network, individuals and investors can now own or co-own a structured smart farm unit designed for modern, technology-driven agriculture.",
      cover: "/assets/img/gallery/g1.jpeg",
      images: [
        "/assets/img/gallery/g3.jpeg",
        "/assets/img/gallery/g4.jpeg",
        "/assets/img/gallery/g5.jpeg",
        "/assets/img/gallery/g6.jpeg",
        "/assets/img/gallery/g7.jpeg",
        "/assets/img/gallery/g8.jpeg",
      ],
    },
  ];

  return (

    <div>

      {/* CAROUSEL SECTION */}
      <div className="banner-area navigation-circle text-light banner-style-one zoom-effect overflow-hidden">
        <div className="banner-fade">
          <div className="swiper-wrapper">

            <div className="swiper-slide banner-style-one">
              <div className="banner-thumb bg-cover shadow dark" style={{ background: 'url(/assets/img/10.avif)' }}></div>
              <div className="shape">
                <Image fill src="/assets/img/shape/2.png" alt="Image Not Found" />
              </div>
              <div className="container">
                <div className="row align-center justify-content-between">
                  <div className="col-xl-11">
                    <div className="content">

                      <div className="info">
                        <h2>Elevate Your Agricultural Operations with Goodlife Smart Farming Network</h2>
                        <p>
                          Real-time data. Verified farmers. Trusted markets. GSFN is building the infrastructure behind African agriculture — one coordinated system at a time.
                        </p>
                        <div className="button">
                          <Link className="btn btn-theme btn-md radius animation" href="/about">Discover More →</Link>
                        </div>
                      </div>

                      <div className="badge mx-5">
                        <div className="curve-text">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" version="1.1">
                            <path id="textPath" d="M 0,75 a 75,75 0 1,1 0,1 z"></path>
                            <text><textPath href="#textPath">Digital Agriculture</textPath></text>
                          </svg>
                          <Link href="https://youtube.com/@goodlifesmartfarmer?" className="popup-youtube"><i className="fas fa-arrow-right"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide banner-style-one">
              <div className="banner-thumb bg-cover shadow dark" style={{ background: 'url(/assets/img/3.jpeg)' }}></div>
              <div className="shape">
                <Image fill src="/assets/img/shape/2.png" alt="Image Not Found" />
              </div>
              <div className="container">
                <div className="row align-center justify-content-between">
                  <div className="col-xl-11">
                    <div className="content">
                      <div className="badge">
                        <div className="curve-text">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" version="1.1">
                            <path id="textPath2" d="M 0,75 a 75,75 0 1,1 0,1 z"></path>
                            <text><textPath href="#textPath">Smart Solutions</textPath></text>
                          </svg>
                          <Link href="https://youtube.com/@goodlifesmartfarmer?" className="popup-youtube"><i className="fas fa-arrow-right"></i></Link>
                        </div>
                      </div>
                      <div className="info">
                        <h2>Transform Your Agricultural Experience with Data-Driven Solutions</h2>
                        <p>
                          GSFN gives farmers, investors, and buyers one shared source of truth. From precision farming tools to verified market connections, we help you plan with confidence instead of chance.
                        </p>
                        <div className="button">
                          <Link className="btn btn-theme btn-md radius animation" href="/about">Discover More →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide banner-style-one">
              <div className="banner-thumb bg-cover shadow dark" style={{ background: 'url(/assets/img/farm-project.jpeg)' }}></div>
              <div className="shape">
                <Image fill src="/assets/img/shape/2.png" alt="Image Not Found" />
              </div>
              <div className="container">
                <div className="row align-center justify-content-between">
                  <div className="col-xl-11">
                    <div className="content">
                      <div className="badge">
                        <div className="curve-text">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" version="1.1">
                            <path id="textPath2" d="M 0,75 a 75,75 0 1,1 0,1 z"></path>
                            <text><textPath href="#textPath">Project Farm 100</textPath></text>
                          </svg>
                          <Link href="https://youtube.com/@goodlifesmartfarmer?" className="popup-youtube"><i className="fas fa-arrow-right"></i></Link>
                        </div>
                      </div>
                      <div className="info">
                        <h2>Project Farm 100</h2>
                        <p>
                          Building Africa's Smart Agricultural Infrastructure.
                        </p>
                        <div className="button">
                          <Link className="btn btn-theme btn-md radius animation" href="/project-farm-100">About the Project →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-style-one-area default-padding overflow-hidden">
        <div className="container">
          <div className="row align-start">
            <div className="col-xl-6 col-lg-5">
              <div className="about-style-one-thumb d-none d-md-block">
                <Image width={750} height={800} className="transform-el transform-y-up delay-2" src="/assets/img/smart_farm_portrait.jpg" alt="Smart Farm" />
                <div className="animation-shape">
                  <Image fill src="/assets/img/illustration/1.png" alt="Shape" />
                </div>
              </div>
            </div>
            <div className="col-xl-5 offset-xl-1 col-lg-6 offset-lg-1">
              <div className="about-style-one-info">

                <h2 className="title">What if farming ran on real-time data & integrity rather than guesswork?</h2>
                <p>
                  GSFN gives farmers, investors, and buyers one shared source of truth. From precision farming tools to verified market connections, we help you plan with confidence instead of chance. This is agriculture, coordinated.
                </p>
                <ul className="top-feature">
                  <li className="transform-el transform-x-left delay-2">
                    <div className="icon">
                      <Image width={80} height={80} src="/assets/img/icon/3.png" alt="Data Icon" />
                    </div>
                    <div className="info">
                      <h4>Real Data. Real Farmers. Real Markets.</h4>
                      <p>
                        Verified farmer networks connected to trusted buyers with transparent pricing.
                      </p>
                    </div>
                  </li>
                  <li className="transform-el transform-x-right delay-2">
                    <div className="icon">
                      <Image width={80} height={80} src="/assets/img/icon/2.png" alt="Integrity Icon" />
                    </div>
                    <div className="info">
                      <h4>Verified Integrity. Traceable Output.</h4>
                      <p>
                        From farm to buyer — every step is tracked, verified, and transparent. No middlemen extracting excessive margins.
                      </p>
                    </div>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EVENT CAROUSEL */}
      <div className="event-carousel-area py-5 bg-gray">
        <div className="container">

          <div className="event-carousel swiper">
            <div className="swiper-wrapper">

              {/* Smart Farmer Movement */}
              <div className="swiper-slide">
                <div className="text-center">
                  <Image
                    src="/assets/img/events/smart-farmer-2026.jpg"
                    width={1200}
                    height={800}
                    className="img-fluid rounded shadow"
                    alt="Smart Farmer Movement 2026"
                  />

                  <div className="mt-4">
                    <Link
                      href="/SFM2026"
                      className="btn btn-theme"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>

              {/* Investors Soiree */}
              <div className="swiper-slide">
                <div className="text-center">
                  <Image
                    src="/assets/img/events/investors-soiree.jpg"
                    width={1200}
                    height={800}
                    className="img-fluid rounded shadow"
                    alt="Investors & Partners Soiree"
                  />

                  <div className="mt-4">
                    <Link
                      href="/L&P2026"
                      className="btn btn-theme"
                    >
                      Sign-up to the Waitlist
                    </Link>
                  </div>
                </div>
              </div>

              {/* ads 1 */}
              <div className="swiper-slide">
                <div className="text-center">
                  <Image
                    src="/assets/img/events/3.jpeg"
                    width={1200}
                    height={800}
                    className="img-fluid rounded shadow"
                    alt="Event"
                  />
                </div>
              </div>

              {/* ads 2 */}
              <div className="swiper-slide">
                <div className="text-center">
                  <Image
                    src="/assets/img/events/2.jpeg"
                    width={1200}
                    height={800}
                    className="img-fluid rounded shadow"
                    alt="Event"
                  />
                </div>
              </div>

              {/* ads 3 */}
              <div className="swiper-slide">
                <div className="text-center">
                  <Image
                    src="/assets/img/events/1.jpeg"
                    width={1200}
                    height={800}
                    className="img-fluid rounded shadow"
                    alt="Event"
                  />
                </div>
              </div>

            </div>

            {/* Navigation */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>

          </div>

        </div>
      </div>

      {/* IMPACT STATISTICS - OPTION B (HONEST FRAMING) */}
      <div className="impact-stats-area default-padding bg-light">
        <div className="container">

          {/* Section Heading */}
          <div className="row mb-5">
            <div className="col-lg-6 offset-lg-3 text-center">
              <h5 className="sub-title">Our Impact</h5>
              <h2 className="title">Building Our Impact, Together</h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="fs-5 mb-4">
                We're just getting started. Every farmer who joins FarmVerse adds to a growing, verified network across Nigeria — and we'll be tracking and sharing our impact publicly as we scale.
              </p>
              
              <Link href="/farmverse" className="btn btn-theme btn-lg">
                Join the Movement →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* SERVICE SECTION */}
      <div className="services-style-one-area bg-gray default-padding bottom-less">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="site-heading text-center">
                <h5 className="sub-title">Platform Features</h5>
                <h2 className="title">Everything You Need for Smarter Farming</h2>
                <span>Comprehensive tools and insights designed to transform your agricultural operations into a smart digital ecosystem.</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 service-one-single transform-el transform-x-right delay-2">
              <div className="service-style-one-item bg-black border-20 border-black-300">
                <div className="thumb">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-5"
                    style={{ width: 60, height: 60 }}>
                    <i className="fas fa-tachometer-alt fs-3"></i>
                  </div>
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link className="text-white" href="#">Smart Dashboard</Link></h4>
                  </div>
                  <p className="mb-3 text-white">
                    Real-time overview of all your farming operations, from crop health to weather conditions in one centralized dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single transform-el transform-y-down delay-2">
              <div className="service-style-one-item bg-black border-20 border-black-300">
                <div className="thumb">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-5"
                    style={{ width: 60, height: 60 }}>
                    <i className="fas fa-cloud-sun fs-3"></i>
                  </div>
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link className="text-white" href="#">Weather Intelligence</Link></h4>
                  </div>
                  <p className="mb-3 text-white">
                    Advanced weather forecasting with agricultural insights, helping you make informed decisions about planting, harvesting and protection.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single transform-el transform-x-left delay-2">
              <div className="service-style-one-item bg-black border-20 border-black-300">
                <div className="thumb">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-5"
                    style={{ width: 60, height: 60 }}>
                    <i className="fas fa-clipboard fs-3"></i>
                  </div>
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link className="text-white" href="#">Activity Tracking</Link></h4>
                  </div>
                  <p className="mb-3 text-white">
                    Log and monitor all farming activities, including planting, fertilization, pest control, and harvesting with detailed analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-3 col-md-3 service-one-single transform-el transform-x-left delay-2">
              <div className="service-style-one-item-small bg-black border-20 border-black-300">
                <div className="thumb justify-content-center d-flex">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center mb-2"
                    style={{ width: 45, height: 45 }}>
                    <i className="fas fa-tachometer-alt fs-3"></i>
                  </div>
                </div>
                <div className="text-center">
                  <h4><Link className="text-white" href="#">Knowledge Base</Link></h4>
                  <p className="mb-3 text-white">
                    Access farming guides and best practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 service-one-single transform-el transform-y-top delay-2">
              <div className="service-style-one-item-small bg-black border-20 border-black-300">
                <div className="thumb justify-content-center d-flex">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-2"
                    style={{ width: 45, height: 45 }}>
                    <i className="fas fa-cloud-sun fs-3"></i>
                  </div>
                </div>
                <div className="text-center">
                  <h4><Link className="text-white" href="#">Community Forum</Link></h4>
                  <p className="mb-3 text-white">
                    Connect with fellow farmers worldwide.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 service-one-single transform-el transform-y-bottom delay-2">
              <div className="service-style-one-item-small bg-black">
                <div className="thumb justify-content-center d-flex">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-2"
                    style={{ width: 45, height: 45 }}>
                    <i className="fas fa-clipboard fs-3"></i>
                  </div>
                </div>
                <div className="text-center">
                  <h4><Link className="text-white" href="#">Profile & Achievement</Link></h4>
                  <p className="mb-3 text-white">
                    Track progress and earn recognition.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 service-one-single transform-el transform-x-right delay-2">
              <div className="service-style-one-item-small bg-black border-20 border-black-300">
                <div className="thumb justify-content-center d-flex">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-2"
                    style={{ width: 45, height: 45 }}>
                    <i className="fas fa-headset fs-3"></i>
                  </div>
                </div>
                <div className="text-center">
                  <h4><Link className="text-white" href="#">24/7 Support</Link></h4>
                  <p className="mb-3 text-white">
                    Get help when you need it the most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FARMING SOLUTIONS SECTION */}
      <div className="services-style-one-area bg-gray default-padding bottom-less">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 service-one-single transform-el transform-y-down delay-3">
              <div className="service-style-one-item">
                <div className="thumb">
                  <Image width={100} height={80} src="/assets/img/illustration/2.png" alt="Smart Farming" />
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link href="#">Smart <span>Farming Solutions</span></Link></h4>
                  </div>
                  <p>
                    Access modern farm machinery and tools through GSFN to improve efficiency, reduce manual labor, and increase yields—without the heavy upfront cost.
                  </p>
                </div>
                <Link href="#" className="btn-angle"><i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single transform-el transform-y-down delay-3">
              <div className="service-style-one-item">
                <div className="thumb">
                  <Image width={100} height={80} src="/assets/img/illustration/3.png" alt="Marketplace" />
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link href="/market-place">Marketplace <span>Produce Hub</span></Link></h4>
                  </div>
                  <p>
                    A trusted digital market where verified farmers trade quality inputs and fresh produce - to expand your market reach and secure more opportunities.
                  </p>
                  <Link href="/market-place" className="btn-angle"><i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single transform-el transform-y-down delay-3">
              <div className="service-style-one-item">
                <div className="thumb">
                  <Image width={100} height={80} src="/assets/img/illustration/4.png" alt="Livestock" />
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link href="#">Livestock <span>Farm Services</span></Link></h4>
                  </div>
                  <p>
                    Data-guided livestock services covering feeding, health, and farm management—powered by verified partners.
                  </p>
                  <Link href="#" className="btn-angle"><i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFIT SECTION */}
      <div className="benifits-area video-bg-live bg-cover mt-md-0 mt-xs-0" style={{ backgroundImage: 'url(/assets/img/6.jpeg)' }}>
        <div className="shape-top-center" style={{ backgroundImage: 'url(/assets/img/shape/10.png)' }}></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="benifit-items text-light">
                <div className="shape">
                  <Image fill src="/assets/img/illustration/8.png" alt="Shape" />
                </div>
                <h2 className="title">Elevate Your Agricultural Operations with GSFN</h2>
                <p>
                  GSFN's innovative agri-tech platform transforms farming practices with technology-driven solutions that make a real difference.
                </p>
                <ul className="list-standard">
                  <li>Smart Farming Solutions</li>
                  <li>Marketplace Produce Hub</li>
                  <li>Livestock Farm Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <div className="product-cat-area default-padding">
        <div className="shape-right-bottom-mini">
          <Image fill src="/assets/img/shape/11.png" alt="Shape" />
        </div>
        <div className="container">
          <div className="product-cat-items">
            <div className="row align-center">
              <div className="col-lg-5 product-cat-info">
                <h2 className="mask-text" style={{ backgroundImage: 'url(/assets/img/shape/28.jpg)' }}>Fresh Products from Verified Farms</h2>
              </div>
              <div className="col-lg-6 offset-lg-1 row align-item-center justify-content-center">
                <div className="product-cat-lists text-light col-12 col-md-10">
                  <div className="product-list-box">
                    <div className="product-list-item">
                      <Link href="/market-place">
                        <Image width={50} height={50} src="/assets/img/icon/9.png" alt="Produce" />
                        <h5>Produce</h5>
                      </Link>
                    </div>

                    <div className="product-list-item">
                      <Link href="/market-place">
                        <Image width={50} height={50} src="/assets/img/icon/10.png" alt="Grains" />
                        <h5>Grains</h5>
                      </Link>
                    </div>

                    <div className="product-list-item">
                      <Link href="/market-place">
                        <Image width={50} height={50} src="/assets/img/icon/11.png" alt="Vegetables" />
                        <h5>Vegetables</h5>
                      </Link>
                    </div>

                    <div className="product-list-item">
                      <Link href="/market-place">
                        <Image width={50} height={50} src="/assets/img/icon/12.png" alt="Crops" />
                        <h5>Crops</h5>
                      </Link>
                    </div>

                  </div>
                </div>

                <Link href="/market-place" className="btn-angle col-2"><i className="fas fa-arrow-right"></i></Link>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div className="gallery-area default-padding bg-gray">
        <div className="container">

          <div className="row mb-5">
            <div className="col-lg-6 offset-lg-3 text-center">
              <h5 className="sub-title">Our Moments</h5>
              <h2 className="title">Gallery & Highlights</h2>
            </div>
          </div>

          <div className="row g-4">

            {galleryEvents.map((event) => (
              <div key={event.id} className="col-lg-4 col-md-6">

                <div
                  className="gallery-card"
                  data-bs-toggle="modal"
                  data-bs-target={`#galleryModal${event.id}`}
                >

                  <div className="gallery-img">
                    <Image
                      src={event.cover}
                      width={600}
                      height={400}
                      alt={event.title}
                      className="img-fluid"
                    />
                  </div>

                  <div className="gallery-info">
                    <h5>{event.title}</h5>
                    <p>{event.description}</p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {galleryEvents.map((event) => (

        <div
          key={event.id}
          className="modal fade"
          id={`galleryModal${event.id}`}
          tabIndex="-1"
        >

          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">{event.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">

                <div className={`swiper gallery-swiper-${event.id}`}>
                  <div className="swiper-wrapper">

                    {event.images.map((img, index) => (
                      <div key={index} className="swiper-slide text-center">

                        <Image
                          src={img}
                          width={900}
                          height={600}
                          alt="Gallery Image"
                          className="img-fluid rounded"
                        />

                      </div>
                    ))}

                  </div>

                  <div className={`swiper-button-next gallery-next-${event.id}`}></div>
                  <div className={`swiper-button-prev gallery-prev-${event.id}`}></div>

                </div>

              </div>

            </div>
          </div>

        </div>

      ))}

    </div>
  );
}
