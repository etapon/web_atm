import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { AppBar, Container, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'

import { getBiodegradableThisMonth, getNonBiodegradableThisMonth, getRecyclableThisMonth } from '../../redux/actions/collection'
import BioCurrentMonth from './TypesPerMonth/BioCurrentMonth'
import NonBioCurrentMonth from './TypesPerMonth/NonBioCurrentMonth'
import RecyclableCurrentMonth from './TypesPerMonth/RecyclableCurrentMonth'

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();

    const {bioCount, nonBioCount, recyclableCount} = useSelector((state) => state.collection);
    
    useEffect(()=> {
        dispatch(getBiodegradableThisMonth())
        dispatch(getNonBiodegradableThisMonth())
        dispatch(getRecyclableThisMonth())
    },[dispatch, location])

    

    return (
        <div>
        <section className="page-section">
            <Container maxWidth='xl'>
                <AppBar className={classes.appBar} position='static' color ='inherit'>
                    <Typography variant = 'h3'>Dashboard</Typography>
                </AppBar>
                
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} lg={4}>
                        <BioCurrentMonth bioCount={bioCount}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <NonBioCurrentMonth nonBioCount={nonBioCount}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <RecyclableCurrentMonth recyclableCount={recyclableCount}/>
                    </Grid>
                    
                </Grid>
                
            </Container>
        </section>
    </div>
    )
}

export default Dashboard