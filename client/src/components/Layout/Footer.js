import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-light">
                <div className='container'>
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item"><a href="/scheduledisplay">Today</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="/schedules">Schedules</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="/wasteTypes">Waste Types</a></li>
                        </ul>
                        <p className="text-muted small mb-4 mb-lg-0">&copy; E-Tapon Mo. All Rights Reserved.</p>
                    </div>
                </div>
                </div>
        </footer>
        </div>
    )
}

export default Footer
