import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { AppBar, Container, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'

import BioToday from './content/BioToday'
import BioThisMonth from './content/BioThisMonth'
import BioThisYear from './content/BioThisYear'
import BioPerStreet from './content/BioPerStreet'
import BioRecord from './content/BioRecord'

import { getBiodegradablesToday, getBiodegradablesThisMonth, getBiodegradablesThisYear, getBiodegradableSorted } from '../../../redux/actions/collection'

const Biodegradable_Analytics = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { bioCount, bioCountThisMonth, bioCountThisYear, bioSorted } = useSelector((state) => state.collection)

    useEffect(()=> {
        const interval = setInterval(() => {
            dispatch(getBiodegradablesToday())
            dispatch(getBiodegradablesThisMonth())
            dispatch(getBiodegradablesThisYear())
            dispatch(getBiodegradableSorted())
          }, 1000);
          return () => clearInterval(interval);
    })

    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>Biodegradables</Typography>
                    </AppBar>

                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <BioToday bioCount={bioCount}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <BioThisMonth bioCountThisMonth={bioCountThisMonth}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <BioThisYear bioCountThisYear={bioCountThisYear}/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <BioPerStreet/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <BioRecord bioSorted={bioSorted}/>
                        </Grid>
                    </Grid>

                </Container>
            </section>
        </div>
    )
}

export default Biodegradable_Analytics