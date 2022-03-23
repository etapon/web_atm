import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import imgShowCase1 from './assets/img/segregate.jpg'
import imgShowCase2 from './assets/img/location_tracking.jpg'
import imgShowCase3 from './assets/img/bg-showcase-3.jpg'

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
                        <h2>Making the switch to a more environmentally friendly behavior</h2>
                        <p className="lead mb-0">One of our project's objectives is to increase residents' awareness of the need of garbage separation. Residents will at least try to sort their waste into biodegradables, non-biodegradables, and recyclables now that the schedule of distinct waste classifications has been separated!</p>
                    </div>
                </div>
                <div className="row g-0">
                    <img className="col-lg-6 text-white showcase-img" style={{backgroundImage: `url(${imgShowCase2})`}}></img>
                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>Collectors’ location monitoring</h2>
                        <p className="lead mb-0">GRAB, LALAMOVE, and other similar apps served as inspiration. We attempted to apply those notions to E-Tapon mo's waste collecting. Residents will be able to use the app to find out where their waste collector is in real time, allowing them to plan or to timing when to go outside and dispose of their trash. This will reduce the unwelcome behavior of dumping wastes on the street, causing an unpleasant odor in the barangay</p>
                    </div>
                </div>
                <div className="row g-0">
                    <img className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url(${imgShowCase3})`}} ></img>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Analytics and Reports</h2>
                        <p className="lead mb-0">Since collection is kept track of by streets and classes (bio, non-bio, recyclable). It can provide more accurate graphs and data visualizations, which are useful for analytics. Barangay administrators can now see which barangays produce the most recyclable, biodegradable, non-biodegradable materials wastes and which produce less.!</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="testimonials text-center bg-light">
            <div className="container">
                <h2 className="mb-5">E-Tapon Mo! Mobile App</h2>
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
        </section>
        </div>
    )
}

export default Home
