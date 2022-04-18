import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

import './arsha/assets/css/style.css'

import imgShowCase1 from './assets/img/f1.jpg'
import imgShowCase2 from './assets/img/f2.jpg'
import imgShowCase3 from './assets/img/f3.jpg'
import udag from './devs/udag.jpg'
import arcillas from './devs/arcillas.jpg'
import huang from './devs/huang.jpg'
import leano from './devs/leano.jpg'
import ytable from './devs/ytable.jpg'
// import udag from './devs/udag.jpg'

// import './arsha/assets/vendor/aos/aos.css'
// import './arsha/assets/vendor/bootstrap/css/bootstrap.min.css'
import './arsha/assets/vendor/bootstrap-icons/bootstrap-icons.css'
// import './arsha/assets/vendor/boxicons/css/boxicons.min.css'
import './arsha/assets/vendor/glightbox/css/glightbox.min.css'
import './arsha/assets/vendor/remixicon/remixicon.css'
import './arsha/assets/vendor/swiper/swiper-bundle.min.css'
import Footer from '../Layout/Footer'





const Home = () => {
    const nav = useNavigate()

    const goToAppPage = () => {
        nav('/appPage')
    }

    return (
        <div>
            <section className="page-section">
            <header className="masthead">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                            <h1 className="mb-5" style={{color: "#FFFFFF"}}>Innovated waste collection, for better monitoring and analytics!</h1>
                                <div className="row">
                                    <button className="btn btn-primary btn-lg" id="submitButton" onClick={goToAppPage}>Check out our App</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section className="features-icons bg-light text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i class="bi-window m-auto text-primary"></i></div>
                            <h3>Segragation</h3>
                            <p className="lead mb-0">collections include segregation for bio non-bio and recyclables!</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i class="bi-layers m-auto text-primary"></i></div>
                            <h3>Collectors’ location monitoring </h3>
                            <p className="lead mb-0">resident users can monitor the collectors’ positions in a map!</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i class="bi-terminal m-auto text-primary"></i></div>
                            <h3>Reports, and Analytics </h3>
                            <p className="lead mb-0">admin will have a better view of data for collected wastes!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="showcase">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <img className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url(${imgShowCase1})`}}></img>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <div className="section-title">
                            <h2>Making the switch to a more environmentally friendly behavior</h2>
                        </div>
                        <p className="lead mb-0">One of our project's objectives is to increase residents' awareness of the need of garbage separation. Residents will at least try to sort their waste into biodegradables, non-biodegradables, and recyclables now that the schedule of distinct waste classifications has been separated!</p>
                    </div>
                </div>
                <div className="row g-0">
                    <img className="col-lg-6 text-white showcase-img" style={{backgroundImage: `url(${imgShowCase2})`}}></img>
                    <div className="col-lg-6 my-auto showcase-text">
                        <div className="section-title">
                            <h2>Collectors’ location monitoring</h2>
                        </div>
                        <p className="lead mb-0">GRAB, LALAMOVE, and other similar apps served as inspiration. We attempted to apply those notions to E-Tapon mo's waste collecting. Residents will be able to use the app to find out where their waste collector is in real time, allowing them to plan or to timing when to go outside and dispose of their trash. This will reduce the unwelcome behavior of dumping wastes on the street, causing an unpleasant odor in the barangay</p>
                    </div>
                </div>
                <div className="row g-0">
                    <img className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url(${imgShowCase3})`}} ></img>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <div className="section-title">
                            <h2>Analytics and Reports</h2>
                        </div>
                        <p className="lead mb-0">Since collection is kept track of by streets and classes (bio, non-bio, recyclable). It can provide more accurate graphs and data visualizations, which are useful for analytics. Barangay administrators can now see which barangays produce the most recyclable, biodegradable, non-biodegradable materials wastes and which produce less.!</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="testimonials text-center bg-light">
            <div className="container">
            <div className="section-title">
                <h2>E-Tapon Mo! Mobile App</h2>
            </div>
                <div className="row">
                    <p>The E-Tapon Application is an online and digital tool that gives residents of Barangay 178 in Pasay City with information on the most recent garbage collection updates. If you live in Barangay 178 in Pasay City download our app below!</p>
                </div>
            </div>
        </section>
        <section className="call-to-action text-white text-center" id="signup">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <h2 className="mb-4" style={{color: "#FFFFFF"}}>Ready to get started? Check our app now!</h2>
                        
                        <div className="col-auto"><button className="btn btn-primary btn-lg" id="submitButton" onClick={goToAppPage} type="submit">Check our App</button></div>
                            
                    </div>
                </div>
            </div>
        </section>

        <section id="about">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                    <h2>About Us</h2>
                    </div>

                        <p>
                        The E-Tapon Mo website and application are now available online, developed by students taking a Bachelor of Science in Information Technology in Technological University of the Philippines Taguig (TUP-Taguig). Providing the residents of Barangay 178 in Pasay City with information on the most recent garbage collection updates. Creating an upgraded waste management system for Pasay City by enhancing the current system and adding an innovative Mobile Smart Trash Collector that can detect the percentage level of the garbage container. As a result, Pasayeños and garbage collectors would benefit from hassle-free garbage collection and management. In addition, to establish a disciplined and cohesive community in the battle over solid waste problems.
                        </p>
                        <p>Waste Types to Consider when using our system <a href="/wasteTypes" className="btn-learn-more">Learn More</a></p>
                        <ul>
                        <li><i className="ri-check-double-line"></i> Biodegradable</li>
                        <li><i className="ri-check-double-line"></i> Non-Biodegradable</li>
                        <li><i className="ri-check-double-line"></i> Recyclable</li>
                        </ul>
                      

                </div>
        </section>
        <section id="team" class="team section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Team</h2>
          <p>This system was developed by students from the Technological University of the Philippines - Taguig, who are also members of the <a href="https://www.facebook.com/mticsofficial" target="_blank">MTICS</a> organization (Manila Technician Institute Computer Society) Please contact us via our social media accounts if you have any further questions or issues. </p>
        </div>

        <div class="row">

          <div class="col-lg-6">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
              <div class="pic"><img src={udag} class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Udag Alexander</h4>
                <span>Backend/Frontend Developer</span>
                <p>If you get tired, LEARN TO REST not to quit!</p>
                <div class="social">
                  <a href="https://twitter.com/Udaglang" target="_blank"><i class="ri-twitter-fill"></i></a>
                  <a href="https://www.facebook.com/Udagz/" target="_blank"><i class="ri-facebook-fill"></i></a>
                  <a href="https://www.instagram.com/dagzue/" target="_blank"><i class="ri-instagram-fill"></i></a>
                  <a href="https://www.linkedin.com/in/alexander-udag-02b3421bb/" target="_blank"> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4 mt-lg-0">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
              <div class="pic"><img src={arcillas} class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Arcillas Mary Joy</h4>
                <span>Project Manager</span>
                <p>"Begin. Even if you have no idea if it will work."</p>
                <div class="social">
                  <a href="https://www.facebook.com/mryjy.018" target="_blank"><i class="ri-facebook-fill"></i></a>
                  <a href="https://www.instagram.com/_majoyiiieee._/" target="_blank"><i class="ri-instagram-fill"></i></a>
                  <a href="https://www.linkedin.com/in/mary-joy-arcillas-271ba0237/" target="_blank"> <i class="ri-linkedin-box-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="300">
              <div class="pic"><img src={leano} class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Leano Maria Princess</h4>
                <span>Graphic Designer/ Frontend Developer</span>
                <p>“The purpose of our lives is to be happy.”</p>
                <div class="social">
                  <a href="https://twitter.com/ces_ssa" target="_blank"><i class="ri-twitter-fill"></i></a>
                  <a href="https://www.facebook.com/princess.leano" target="_blank"><i class="ri-facebook-fill"></i></a>
                  <a href="https://www.instagram.com/leano_cess/?hl=en" target="_blank"><i class="ri-instagram-fill"></i></a>
                  <a href="https://www.linkedin.com/in/princess-lea%C3%B1o-399b9b236/" target="_blank"> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="400">
              <div class="pic"><img src={huang} class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Huang Eileen Joy</h4>
                <span>The (quality) tester/ Analyst</span>
                <p>"It also seems impossible until it's done. -Nelson Mandela"</p>
                <div class="social">
                  <a href="https://www.facebook.com/huangeileenjoy" target="_blank"><i class="ri-facebook-fill"></i></a>
                  <a href="https://www.instagram.com/eilnfretea/?hl=en" target="_blank"><i class="ri-instagram-fill"></i></a>
                  <a href="https://www.linkedin.com/in/eileen-joy-huang-415b97237/" target="_blank"> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="400">
              <div class="pic"><img src={ytable} class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Ytable Mark Joseph</h4>
                <span>The (quality) tester/ Analyst</span>
                <p>“Failure is a detour; not a dead-end street.” -Zig Ziglar</p>
                <div class="social">
                  <a href="https://twitter.com/MarkYtable" target="_blank"><i class="ri-twitter-fill"></i></a>
                  <a href="https://www.facebook.com/Mark5647" target="_blank"><i class="ri-facebook-fill"></i></a>
                  <a href="https://www.instagram.com/nyx_ytable/" target="_blank"><i class="ri-instagram-fill"></i></a>
                  <a href="https://www.linkedin.com/in/mark-joseph-ytable/" target="_blank"> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
        </section>
        <Footer/>
        </div>
    )
}

export default Home
