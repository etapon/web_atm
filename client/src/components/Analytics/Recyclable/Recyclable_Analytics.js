import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { AppBar, Container, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'

import RecyclableToday from './content/RecyclableToday'
import RecyclableThisMonth from './content/RecyclableThisMonth'
import RecyclableThisyear from './content/RecyclableThisYear'
import RecyclablePerStreet from './content/RecyclablePerStreet'
import RecyclableRecord from './content/RecyclableRecord'

import { getRecyclablesToday, getRecyclablesThisMonth, getRecyclablesThisYear, getRecyclableSorted } from '../../../redux/actions/collection'

const Recyclable_Analytics = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { recyclableCount, recyclableCountThisMonth, recyclableCountThisYear, recyclableSorted } = useSelector((state) => state.collection)

    useEffect(()=> {
        const interval = setInterval(() => {
            dispatch(getRecyclablesToday())
            dispatch(getRecyclablesThisMonth())
            dispatch(getRecyclablesThisYear())
            dispatch(getRecyclableSorted())
          }, 1000);
          return () => clearInterval(interval);
    })

    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>Recyclables</Typography>
                    </AppBar>

                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <RecyclableToday recyclableCount={recyclableCount}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <RecyclableThisMonth recyclableCountThisMonth ={recyclableCountThisMonth}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <RecyclableThisyear recyclableCountThisYear={recyclableCountThisYear}/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <RecyclablePerStreet/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <RecyclableRecord recyclableSorted={recyclableSorted}/>
                        </Grid>
                    </Grid>

                </Container>
            </section>
        </div>
    )
}

export default Recyclable_Analytics