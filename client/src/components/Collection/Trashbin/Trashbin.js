import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Circle } from 'rc-progress';
import useStyles from './styles'
import { Grid, Paper, AppBar, Button, Container, Typography} from '@material-ui/core'
import ReactMapGL, { Marker } from 'react-map-gl'
import { db } from '../../../utils/firebase';
import {ref, onValue} from 'firebase/database';
import truck from './truck.png'
import noCollection from './no_collection.png'

const Trashbin = () => {
    const classes = useStyles()
    const nav = useNavigate()
    const [ binPercentage, setBinPercentage ] = useState();
    const [ binCurrentWeight, setBinCurrentWeight ] = useState();
    const [ collectorLat, setCollectorLat ] = useState();
    const [ collectorLong, setCollectorLong ] = useState();
    const [ active, setActive ] = useState(false)
    const [ wasteType, setWasteType ] = useState()
    const [ street, setStreet ] = useState()
    const [viewport, setViewport] = useState({
        width: "100%",
        height: 500,
        latitude: 14.5378,
        longitude: 121.0014,
        zoom: 11
      })

    useEffect(()=>{
        onValue(ref(db), snapshot => {
            const binPercent = snapshot.child('TrashBin').val()
            if(binPercent !== null){
                const converted = parseInt(binPercent)
                setBinPercentage(converted)
            }

            const binWeight = snapshot.child('Weight').val()
            if(binWeight !== null){
                const  converted = parseInt(binWeight)
                setBinCurrentWeight(converted)
            }

            const loc = snapshot.child('loc').val()
            if(loc !== null){
                setCollectorLat(loc.lat)
                setCollectorLong(loc.long)
            }

            const activeStatus = snapshot.child('activeStatus').val()
            if(activeStatus === 'active'){
                setActive(true)
            }else{
                setActive(false)
            }

            const type = snapshot.child('wasteType').val()
            if(type !== null){
                setWasteType(type)
            }

            const street = snapshot.child('streetAssigned').val()
            if(street !== null){
                setStreet(street)
            }
        })

        
    },[])
    
    const goToSchedules = () => {
        nav('/schedules')
    }

    return (
        <section className="page-section container">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>Real Time Trashbin monitoring</Typography>
                    </AppBar>
                    {active? (<>
                    <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                                <Typography variant="body1" component="h5">Type: <strong>{wasteType}</strong></Typography>
                                <Typography variant="body1" component="h5">Street Assigned: <strong>{street}</strong></Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                                <Typography variant="body1" component="h5">Trash bin current weight: <strong>{binCurrentWeight} kg</strong></Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                                <Typography variant="body1" component="h5">Trash bin Level percentage: <strong>{binPercentage} %</strong></Typography>
                                <center><Circle percent={binPercentage} strokeWidth="4" width='50px'/></center>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                            <ReactMapGL
                                mapStyle='mapbox://styles/etapon/cl1jmki7b009o15qsg5dfegwl'
                                
                                {...viewport}
                                mapboxApiAccessToken="pk.eyJ1IjoiZXRhcG9uIiwiYSI6ImNrejlhaHZ2ODFwOGMycnA0MGFyY3huN3MifQ.q9-oOru792YFjE9lp0SGFQ"
                                onViewportChange={nextViewport => setViewport(nextViewport)}>
                                    {collectorLat && collectorLong ? (<Marker latitude={collectorLat} longitude={collectorLong}>
                                        <img src={truck} alt='truck' style={{width:viewport.zoom*3 ,cursor:'pointer'}}/>
                                    </Marker>):(<></>)}
                                    
                            </ReactMapGL>
                            </Paper>
                        </Grid>
                    </Grid>
                    
                    </>):(<>
                        <center>
                            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                                <img src={noCollection} alt='no_collection' sytle={{height: '50'}}/>
                                <Typography variant="h5" component="h2"> No Active Collector, (please wait for collection)</Typography>
                                <Button color='primary' onClick={goToSchedules}>go to schedules</Button>
                            </Paper>
                        </center>
                    </>)}
                    
                    
                    
                </Container>
        </section>
    );
};

export default Trashbin;
