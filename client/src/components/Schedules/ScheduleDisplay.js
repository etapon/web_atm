import React, {useEffect, useState} from 'react'

import useStyles from './ScheduleDetails/styles'
import { Grid, Container, Paper, CircularProgress, Divider} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getSchedToday } from '../../redux/actions/schedule'
import infographic from './ScheduleDetails/infographic.jpg'
import ReactMapGL, { Marker } from 'react-map-gl'

const ScheduleDisplay = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { schedToday } = useSelector((state)=> state.schedule)
    const locale = 'ph';
    const [today, setDate] = useState(new Date())

    useEffect(()=> {
        const interval = setInterval(() => {
            dispatch(getSchedToday())
            setDate(new Date());
          }, 1000);
          return () => clearInterval(interval);
    
    },[])

    const [viewport, setViewport] = useState({
        width: "100%",
        height: 500,
        latitude: 14.530513,
        longitude: 121.006599,
        zoom: 17
    })

    console.log(schedToday)
    
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
    
    return (
        <div className='container'>
            <section className="page-section mt-5">
                    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                        <div className="text-center text-white">
                            <h1 className="mb-3">{wish + date + time}</h1>
                        </div>
                    </Paper>
                    <div className='mt-3'>
                        {schedToday == null ?<>
                            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                                <div className="text-center text-white">
                                    <h3>No Assigned Schedule Today!</h3>
                                </div>
                            </Paper>
                        </>: <>
                            {Object.keys(schedToday).length >= 1 ?<>
                                
                                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} lg={6}>
                                        <div className="text-center">
                                            <h6>Today is</h6>
                                            <h3>{schedToday.type ? schedToday.type + " day!": null}</h3>
                                        </div>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                        <div className="text-center">
                                            <h6>Collector is</h6>
                                            <h3>{schedToday.collector.name ? schedToday.collector.name : null}</h3>
                                        </div>
                                        </Grid>
                                    </Grid>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <div className={classes.card}>
                                        <div className={classes.section}>
                                            
                                            <h5>Streets to collect today</h5>

                                            <ol>
                                                {schedToday.queue.map((schedule) => (
                                                    <li>{schedule}</li>
                                                ))}
                                            </ol>
                                        </div>
                                        <div className={classes.imageSection}>
                                            <img className={classes.media} src={infographic} alt='alt' />
                                        </div>
                                    </div>
                                </Paper>
                            </>:<center><CircularProgress/></center>}
                        </> }
                        
                    </div>
                    <Paper className='mt-3' style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                        <h5 className='text-center'>Barangay 178 map</h5>
                        <ReactMapGL
                            mapStyle='mapbox://styles/etapon/cl1jmki7b009o15qsg5dfegwl'
                            
                            {...viewport}
                            mapboxApiAccessToken="pk.eyJ1IjoiZXRhcG9uIiwiYSI6ImNrejlhaHZ2ODFwOGMycnA0MGFyY3huN3MifQ.q9-oOru792YFjE9lp0SGFQ"
                            onViewportChange={nextViewport => setViewport(nextViewport)}>
                        </ReactMapGL>
                    </Paper>
            </section>
        </div>
    )
}

export default ScheduleDisplay