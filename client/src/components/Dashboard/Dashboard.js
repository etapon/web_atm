import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { AppBar, Container, Typography, Grid, Divider } from '@material-ui/core'
import useStyles from './styles'

import { getSchedToday } from '../../redux/actions/schedule'
import { getTotalPerStreetToday, getBiodegradablesToday, getNonBiodegradablesToday, getRecyclablesToday } from '../../redux/actions/collection'
import { getUserStreets, getResidentCount } from '../../redux/actions/auth'

import Biodegradable from './content/Biodegradable'
import NonBiodegradable from './content/NonBiodegradable'
import Recyclable from './content/Recyclable'
import CollectionStatus from './Collection/CollectionStatus'
import ResidentCount from './content/ResidentCount'
import ScheduleToday from './content/ScheduleToday' 
import ResidentStreets from './Charts/ResidentStreets'
import CollectionStreets from './Charts/CollectionStreet'

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const locale = 'ph';
    const [today, setDate] = React.useState(new Date());

    useEffect(()=> {
        const timer = setInterval(() => { 
            setDate(new Date());
          }, 60 * 1000);
          return () => {
            clearInterval(timer);
        }
    })

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    const [bio, setBio] = useState()
    const [nonBio, setNonBio] = useState()
    const [recyclable, setRecyclable] = useState()

    const { bioCount, nonBioCount, recyclableCount, totalCollected
    } = useSelector((state) => state.collection);

    const { schedToday } = useSelector((state)=> state.schedule)

    const {residentCount} = useSelector((state) => state.auth)
    
    useEffect(()=> {
        
        const interval = setInterval(() => {
            dispatch(getSchedToday())
            dispatch(getUserStreets())
            dispatch(getBiodegradablesToday())
            dispatch(getNonBiodegradablesToday())
            dispatch(getRecyclablesToday())
            dispatch(getTotalPerStreetToday())
            dispatch(getResidentCount())
          }, 1000);
          return () => clearInterval(interval);
    
    },[])
    

    useEffect(()=>{
        if(bioCount != null && nonBioCount != null && recyclableCount != null){
            setBio(bioCount)
            setNonBio(nonBioCount)
            setRecyclable(recyclableCount)
        }
    })

    return (
        <div>
        <section className="page-section">
            <Container maxWidth='xl'>
                <AppBar className={classes.appBar} position='static' color ='inherit'>
                    <Typography variant = 'h4'><strong>{wish}</strong> {date + time}</Typography>
                </AppBar>
                
                <Grid container spacing={3}>

                    <Grid item xs={12} lg={3}>
                        {schedToday.type == 'Biodegradable'?
                            <Grid item xs={12} lg={12}>
                                <Biodegradable bio={bio}/>
                            </Grid>
                            : null
                        }
                        
                        {schedToday.type == 'non-Biodegradable'?
                            <Grid item xs={12} lg={12}>
                                <NonBiodegradable nonBio={nonBio}/>
                            </Grid>
                            : null
                        }

                        {schedToday.type == 'Recyclable'?
                            <Grid item xs={12} lg={12}>
                                <Recyclable recyclable={recyclable}/>
                            </Grid>
                            : null
                        }
                        <Divider style={{ margin: '5px 0' }} />
                        <Grid item xs={12} lg={12}>
                            <CollectionStatus/>
                        </Grid>
                        <Divider style={{ margin: '5px 0' }} />
                        <Grid item xs={12} lg={12}>
                            <ResidentCount residentCount={residentCount}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <Grid item xs={12} lg={12}>
                            <CollectionStreets totalCollected={totalCollected}/>
                        </Grid>
                    </Grid>
                    
                    {/* <Grid item xs={12} lg={9}>
                        <ScheduleToday streets={schedToday.queue}/>
                    </Grid> */}

                    {/* <Grid item xs={12} lg={3}>
                        <ResidentStreets userStreets={userStreets}/>
                    </Grid> */}

                    
                    
                    

                </Grid>
                
            </Container>
        </section>
    </div>
    )
}

export default Dashboard