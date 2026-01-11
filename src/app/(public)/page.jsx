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
    }
  }, []);

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
                          Experience unparalleled advancements in agriculture with Goodlife Smart Farming Network (SFN).
                        </p>
                        <div className="button">
                          <Link className="btn btn-theme btn-md radius animation" href="/about">Discover More</Link>
                        </div>
                      </div>

                      <div className="badge mx-5">
                        <div className="curve-text">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" version="1.1">
                            <path id="textPath" d="M 0,75 a 75,75 0 1,1 0,1 z"></path>
                            <text><textPath href="#textPath">100% Smart Solutions</textPath></text>
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
                            <text><textPath href="#textPath">100% Agricultural & Tech</textPath></text>
                          </svg>
                          <Link href="https://youtube.com/@goodlifesmartfarmer?" className="popup-youtube"><i className="fas fa-arrow-right"></i></Link>
                        </div>
                      </div>
                      <div className="info">
                        <h2>Transform Your Agricultural Experience with Smart Solutions</h2>
                        <p>
                          Implement our cutting-edge techniques to enhance crop yields and streamline farm management with real-time data insights.
                        </p>
                        <div className="button">
                          <Link className="btn btn-theme btn-md radius animation" href="/about">Discover More</Link>
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
                <Image width={750} height={800} src="/assets/img/smart_farm_portrait.jpg" alt="Image Not Found" />
                <div className="animation-shape">
                  <Image fill src="/assets/img/illustration/1.png" alt="Image Not Found" />
                </div>
              </div>
            </div>
            <div className="col-xl-5 offset-xl-1 col-lg-6 offset-lg-1">
              <div className="about-style-one-info">

                <h2 className="title">What if farming ran on real-time data & integrity rather than guesswork?</h2>
                <p>
                  Experience unparalleled advancements in agriculture with Goodlife Smart Farming Network (SFN). Our tailored services, from precision farming solutions to market connectivity, empower you to optimize operations and enhance productivity. Join us in pioneering the future of agriculture.
                </p>
                <div className="fun-fact-style-flex mt-35">
                  <div className="counter">
                    <div className="timer" data-to="25" data-speed="2000">25</div>
                    <div className="operator">M</div>
                  </div>
                  <span className="medium">Growth Tonns <br /> of Harvest</span>
                </div>
                <ul className="top-feature">
                  <li>
                    <div className="icon">
                      <Image width={80} height={80} src="/assets/img/icon/3.png" alt="Image Not Found" />
                    </div>
                    <div className="info">
                      <h4>100% Guaranteed Organic Product</h4>
                      <p>
                        Naturally grown, chemical-free, and fully traceable - from farm to table.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <Image width={80} height={80} src="/assets/img/icon/2.png" alt="Image Not Found" />
                    </div>
                    <div className="info">
                      <h4>Real Food. Real Farms. Real Proof.</h4>
                      <p>
                        Organically grown, data-backed, and honestly delivered. No chemicals. No compromises. Just clean & traceable food.
                      </p>
                    </div>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>


      {/* SERVICE SECTION */}

      {/* /assets/img//green-house.jpeg add this image later */}
      <div className="services-style-one-area bg-gray default-padding bottom-less">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="site-heading text-center">
                <h5 className="sub-title">Platform Features</h5>
                <h2 className="title">Everything you need for a Smarter farming</h2>
                <span>Comprehensive tools and insights designed to transform your agricultural operations into a smart digital ecosystem.</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 service-one-single">
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
                    Real-time overview of all you farming operations, from crop health to weather conditions in one centralized dashboard.
                  </p>
                </div>
                <Link href="#" className="text-warning">Explore Dashboard <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single">
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
                  <Link href="#" className="text-warning">View Weather Tool <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single">
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
                  <Link href="#" className="text-warning">Start Logging <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-3 col-md-3 service-one-single">
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

            <div className="col-lg-3 col-md-3 service-one-single">
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
                    Connect with fellow farmers worlwide.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 service-one-single">
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
                    Track progress and earn regocnition.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 service-one-single">
              <div className="service-style-one-item-small bg-black border-20 border-black-300">
                <div className="thumb justify-content-center d-flex">
                  <div className="bg-warning text-white rounded d-flex align-items-center justify-content-center me-3 mb-2"
                    style={{ width: 45, height: 45 }}>
                    <i className="fas fa-clipboard fs-3"></i>
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
            <div className="col-lg-4 col-md-6 service-one-single">
              <div className="service-style-one-item">
                <div className="thumb">
                  <Image width={100} height={80} src="/assets/img/illustration/2.png" alt="Image Not Found" />
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link href="/market-place">Smart <span>Farming Solutions</span></Link></h4>
                  </div>
                  <p>
                    Access modern farm machinery and tools through SFN to improve efficiency, reduce manual labor, and increase yields—without the heavy upfront cost.
                  </p>
                </div>
                <Link href="/market-place" className="btn-angle"><i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single">
              <div className="service-style-one-item">
                <div className="thumb">
                  <Image width={100} height={80} src="/assets/img/illustration/3.png" alt="Image Not Found" />
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link href="/market-place">Marketplace  <span>Produce Hub</span></Link></h4>
                  </div>
                  <p>
                    A trusted digital market where verified farmers trade quality inputs and fresh produce - to expand your martket reach and secure more opportunities.
                  </p>
                  <Link href="/market-place" className="btn-angle"><i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 service-one-single">
              <div className="service-style-one-item">
                <div className="thumb">
                  <Image width={100} height={80} src="/assets/img/illustration/4.png" alt="Image Not Found" />
                </div>
                <div className="info">
                  <div className="top">
                    <h4><Link href="/market-place">Livestock  <span>Farm Services</span></Link></h4>
                  </div>
                  <p>
                    Data-guided livestock services covering feeding, health, and farm management—powered by verified partners
                  </p>
                  <Link href="/market-place" className="btn-angle"><i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFIT SECTION */}
      <div className="benifits-area  video-bg-live bg-cover mt-md-0 mt-xs-0" style={{ backgroundImage: 'url(/assets/img/6.jpeg)' }}>
        <div className="player" data-property="{videoURL:'w9eRIGTHKJM',containment:'.video-bg-live', showControls:false, autoPlay:true, zoom:0, loop:true, mute:true, startAt:13, opacity:1, quality:'default'}"></div>
        <div className="shape-top-center" style={{ backgroundImage: 'url(/assets/img/shape/10.png)' }}></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="benifit-items text-light">
                <div className="shape">
                  <Image fill src="/assets/img/illustration/8.png" alt="Image Not Found" />
                </div>
                <h2 className="title">Elevate Your Agricultural Operations with SFN</h2>
                <p>
                  SFN&apos;s innovative agri-tech platform transformed my farming practices with technology-driven solutions that truly made a difference.
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
          <Image fill src="/assets/img/shape/11.png" alt="Image Not Found" />
        </div>
        <div className="container">
          <div className="product-cat-items">
            <div className="row align-center">
              <div className="col-lg-5 product-cat-info">
                <h2 className="mask-text" style={{ backgroundImage: 'url(/assets/img/shape/28.jpg)' }}>Healthy Life With Fresh Products</h2>
              </div>
              <div className="col-lg-6 offset-lg-1 row align-item-center">
                <div className="product-cat-lists text-light col-10">
                  <div className="product-list-box">
                    <div className="product-list-item">
                      <Link href="services-details.html">
                        <Image width={50} height={50} src="/assets/img/icon/9.png" alt="Icon" />
                        <h5>Blueberry</h5>
                      </Link>
                    </div>

                    <div className="product-list-item">
                      <Link href="services-details.html">
                        <Image width={50} height={50} src="/assets/img/icon/10.png" alt="Icon" />
                        <h5>Strawberry</h5>
                      </Link>
                    </div>

                    <div className="product-list-item">
                      <Link href="services-details.html">
                        <Image width={50} height={50} src="/assets/img/icon/11.png" alt="Icon" />
                        <h5>Cabbage</h5>
                      </Link>
                    </div>

                    <div className="product-list-item">
                      <Link href="services-details.html">
                        <Image width={50} height={50} src="/assets/img/icon/12.png" alt="Icon" />
                        <h5>Maize</h5>
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

      {/* CONTACT SECTION */}
      {/* <div className="contact-area overflow-hidden bg-gray default-padding">
        <div className="sahpe-right-bottom">
          <Image fill src="/assets/img/shape/16.png" alt="Image Not Found" />
        </div>
        <div className="container">
          <div className="row align-center">

            <div className="col-tact-stye-one col-xl-6 col-lg-7">
              <div className="contact-form-style-one mb-md-50">
                <Image width={300} height={300} src="/assets/img/illustration/10.png" alt="Image Not Found" />
                <h5 className="sub-title">Have Questions?</h5>
                <h2 className="heading">Send us a massage</h2>
                <form action="/assets/mail/contact.php" method="POST" className="contact-form contact-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input className="form-control" id="name" name="name" placeholder="Name" type="text" />
                        <span className="alert-error"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="email" name="email" placeholder="Email*" type="email" />
                        <span className="alert-error"></span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="phone" name="phone" placeholder="Phone" type="text" />
                        <span className="alert-error"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group comments">
                        <textarea className="form-control" id="comments" name="comments" placeholder="Tell Us About Project *"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button type="submit" name="submit" id="submit">
                        <i className="fa fa-paper-plane"></i> Get in Touch
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-12 alert-notification">
                    <div id="message" className="alert-msg"></div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-tact-stye-one col-xl-5 offset-xl-1 col-lg-5">
              <div className="contact-style-one-info text-light">
                <h2>
                  Contact
                  <span>
                    Information
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M14.4,111.6c0,0,202.9-33.7,471.2,0c0,0-194-8.9-397.3,24.7c0,0,141.9-5.9,309.2,0" style={{ animationPlayState: 'running' }}></path></svg>
                  </span>
                </h2>
                <p>
                  Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing.
                </p>
                <ul>
                  <li>
                    <div className="content">
                      <h5 className="title">Hotline</h5>
                      <Link href="">+234(0) 912 188 1781</Link>
                    </div>
                  </li>
                  <li>
                    <div className="info">
                      <h5 className="title">Our Location</h5>
                      <p>
                        HeadQuarters Address: 82A Js Tarkaa Railway Bye Pass, Makurdi, <br /> Benue State.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="info">
                      <h5 className="title">Official Email</h5>
                      <Link href="mailto: smartfarmningetwork@gmail.com"> smartfarmningetwork@gmail.com</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div> */}
    </div>
  );
}
