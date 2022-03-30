import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { AppBar, Container, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'

import { getTotalPerStreetToday, getBiodegradablesToday, getNonBiodegradablesToday, getRecyclablesToday } from '../../redux/actions/collection'
import { getUserStreets } from '../../redux/actions/auth'

import Biodegradable from './Today/Biodegradable'
import NonBiodegradable from './Today/NonBiodegradable'
import Recyclable from './Today/Recyclable'
import Collected from './Today/Collected'
import CollectionStatus from './Collection/CollectionStatus'

import ResidentStreets from './Charts/ResidentStreets'
import CollectionStreets from './Charts/CollectionStreet'

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();

    const [totalValue, setTotalValue] = useState()
    const [bio, setBio] = useState()
    const [nonBio, setNonBio] = useState()
    const [recyclable, setRecyclable] = useState()

    const { bioCount, nonBioCount, recyclableCount, totalCollected
    } = useSelector((state) => state.collection);

    const {userStreets} = useSelector((state) => state.auth)
    
    useEffect(()=> {
        
        const interval = setInterval(() => {
            dispatch(getUserStreets())
            dispatch(getBiodegradablesToday())
            dispatch(getNonBiodegradablesToday())
            dispatch(getRecyclablesToday())
            dispatch(getTotalPerStreetToday())
          }, 1000);
          return () => clearInterval(interval);
    
    },[])
    
    

    var total = 0

    useEffect(()=>{
        if(bioCount != null && nonBioCount != null && recyclableCount != null){

            total = bioCount + nonBioCount + recyclableCount
            setBio(bioCount)
            setNonBio(nonBioCount)
            setRecyclable(recyclableCount)
            setTotalValue(total)

            total = 0
        }
    })

    return (
        <div>
        <section className="page-section">
            <Container maxWidth='xl'>
                <AppBar className={classes.appBar} position='static' color ='inherit'>
                    <Typography variant = 'h4'>Dashboard</Typography>
                </AppBar>
                
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} lg={3}>
                        <Biodegradable bio={bio}/>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <NonBiodegradable nonBio={nonBio}/>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Recyclable recyclable={recyclable}/>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Collected totalValue={totalValue}/>
                    </Grid>

                    <Grid item xs={12} lg={3}>
                        <ResidentStreets userStreets={userStreets}/>
                    </Grid>

                    <Grid item xs={12} lg={3}>
                        <CollectionStatus/>
                    </Grid>
                    
                    <Grid item xs={12} lg={6}>
                        <CollectionStreets totalCollected={totalCollected}/>
                    </Grid>

                </Grid>
                
            </Container>
        </section>
    </div>
    )
}

export default Dashboard