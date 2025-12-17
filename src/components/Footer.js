'use client';
import Image from "next/image";
import Link from "next/link";



export default function Footer(){
    return (
        <footer className="bg-dark text-light" style={{backgroundImage: 'url(/assets/img/shape/8.png)'}}>
            <div className="container">
                <div className="f-items default-padding">
                    <div className="row">


                        <div className="col-lg-4 col-md-6 item">
                            <div className="footer-item about">
                                {/*<Image  fill className="logo" src="/assets/img/logo-light.png" alt="Logo" /> */}
                                <h2>Smart Farming Network (SFN)</h2>
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
                                        <Link href="#">Services</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Community</Link>
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
                                            82A Js Tarkaa Railway Bye Pass, Makurdi, Benue State.
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="content">
                                            <strong>Email:</strong>
                                            <Link href="mailto:smartfarmningetwork@gmail.com">smartfarmningetwork@gmail.com</Link>
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
                                        <Link href="#">
                                            <i className="fab fa-youtube"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <p>&copy; Copyright 2023. All Rights Reserved by <Link href="#">validthemes</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-right-bottom">
            <Image  width={50} height={50} src="/assets/img/shape/7.png" alt="Image Not Found" />
            </div>
        </footer>
    )
}