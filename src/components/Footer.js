'use client';
import Image from "next/image";
import Link from "next/link";



export default function Footer() {
    return (
        <footer className="bg-dark text-light">
            <div className="container">
                <div className="f-items default-padding">
                    <div className="row">


                        <div className="col-lg-4 col-md-6 item">
                            <div className="footer-item about">
                                {/*<Image  fill className="logo" src="/assets/img/logo-light.png" alt="Logo" /> */}
                                <h2>Goodlife Smart Farming Network (GSFN)</h2>
                                <p>
                                    Seamlessly connect with key stakeholders—buyers, suppliers, and investors—to expand your market reach and secure growth opportunities.
                                </p>
                                <form action="#">
                                    <input type="email" placeholder="Your Email" className="form-control" name="email" />
                                    <button type="submit"> Go</button>
                                </form>
                            </div>
                        </div>


                        <div className="col-lg-2 col-md-6 item">
                            <div className="footer-item link">
                                <h4 className="widget-title">Explore</h4>
                                <ul>
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>

                                    <li>
                                        <Link href="/services">Services</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/community">Community</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6 item">
                            <div className="footer-item contact">
                                <h4 className="widget-title">Contact Info</h4>
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-home"></i>
                                        </div>
                                        <div className="content">
                                            <strong>Address:</strong>
                                            GP 567. Atom Kpera Along Modern Market Road, Besides Monatel Hotel, Makurdi, Benue State, Nigeria.
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="content">
                                            <strong>Email:</strong>
                                            <Link href="mailto:admin@smartfarmingnetwork.com">admin@smartfarmingnetwork.com</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div className="content">
                                            <strong>Phone:</strong>
                                            <Link href="tel:+234912 188 1781"> +234(0) 912 188 1781</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 item">
                            <div className="footer-item apps">
                                <h4 className="widget-title">Download Apps</h4>
                                <ul className="d-flex flex-column gap-2">
                                    {/* <li>
                                        <Link
                                            href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Image
                                                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                                alt="Get it on Google Play"
                                                width={150}
                                                height={60}
                                                priority
                                                className="h-100 w-100"
                                            />
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Image
                                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                                alt="Download on the App Store"
                                                width={150}
                                                height={45}
                                                className="h-100 w-100 container"
                                            />
                                        </Link>
                                    </li> */}

                                    <li className="container p-4 px-2">
                                        <Link
                                            href="https://drive.google.com/file/d/1h6ALXzfmM5lOWjaIEyR4FWKQxB57BQ7Q/view?usp=sharing"
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="d-flex justify-content-center align-items-center btn-dark border rounded p-2"
                                        >
                                            <Image
                                                src="/assets/img/andriod-icon.png"
                                                alt="Download APK"
                                                width={80}
                                                height={80}
                                                className=""
                                            />
                                            <h4 className="text-wrap text-center">Download App</h4>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="footer-bottom text-center">
                    <div className="row">
                        <div className="">
                            <div className="">
                                <ul className="social d-flex justify-content-center">
                                    <li className="me-3">
                                        <Link href="https://www.facebook.com/goodlifesmartfarmingnetwork" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li className="me-3">
                                        <Link href="https://www.instagram.com/goodlifesmartfarmingnetwork?igsh=MWZsOWFrNG5waDNvcg==" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"></i>
                                        </Link>
                                    </li>
                                    <li className="me-3">
                                        <Link href="https://www.linkedin.com/company/goodlife-smart-farming-network-limited/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-linkedin-in"></i>
                                        </Link>
                                    </li>
                                    <li className="me-3">
                                        <Link href="https://youtube.com/@goodlifesmartfarmer">
                                            <i className="fab fa-youtube"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <p>&copy; Copyright <Link href="#">GSFN</Link> 2026. All right reserved.</p>
                            <p className="text-muted fs-6 fw-light">Developed By the <Link href="#">GSFN</Link> - Tech Department</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-right-bottom">
                <Image width={50} height={50} src="/assets/img/shape/7.png" alt="Image Not Found" />
            </div>
        </footer>
    )
}