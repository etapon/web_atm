import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { AppBar, Container, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'

import NonBioToday from './content/NonBioToday'
import NonBioThisMonth from './content/NonBioThisMonth'
import NonBioThisYear from './content/NonBioThisYear'
import NonBioPerStreet from './content/NonBioPerStreet'
import NonBioRecord from './content/NonBioRecord'

import { getNonBiodegradablesToday, getNonBiodegradablesThisMonth, getNonBiodegradablesThisYear, getNonBiodegradableSorted } from '../../../redux/actions/collection'

const NonBiodegradable_Analytics = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { nonBioCount, nonBioCountThisMonth, nonBioCountThisYear, nonBioSorted } = useSelector((state) => state.collection)

    useEffect(()=> {
        const interval = setInterval(() => {
            dispatch(getNonBiodegradablesToday())
            dispatch(getNonBiodegradablesThisMonth())
            dispatch(getNonBiodegradablesThisYear())
            dispatch(getNonBiodegradableSorted())
          }, 1000);
          return () => clearInterval(interval);
    })

    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>non-Biodegradables</Typography>
                    </AppBar>

                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <NonBioToday nonBioCount={nonBioCount}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <NonBioThisMonth nonBioCountThisMonth={nonBioCountThisMonth}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <NonBioThisYear nonBioCountThisYear={nonBioCountThisYear}/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <NonBioPerStreet/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <NonBioRecord nonBioSorted={nonBioSorted}/>
                        </Grid>
                    </Grid>

                </Container>
            </section>
        </div>
    )
}

export default NonBiodegradable_Analytics