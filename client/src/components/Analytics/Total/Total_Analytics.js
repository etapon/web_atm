import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Container, Typography, Grid } from '@material-ui/core'
import useStyles from './styles'

import CollectedToday from './content/CollectedToday'
import CollectedThisMonth from './content/CollectedThisMonth'
import CollectedThisYear from './content/CollectedThisYear'
import CollectedRecord from './content/CollectedRecord' 
import CollectedWasteType from './content/CollectedWasteType'
import { getCollectedToday, getCollectedThisMonth, getCollectedThisYear, getCollectedSorted } from '../../../redux/actions/collection'

const Total_Analytics = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { collectedCount, collectedCountThisMonth, collectedCountThisYear, collectedSorted } = useSelector((state) => state.collection)

    useEffect(()=> {
        const interval = setInterval(() => {
            dispatch(getCollectedToday())
            dispatch(getCollectedThisMonth())
            dispatch(getCollectedThisYear())
            dispatch(getCollectedSorted())
          }, 1000);
          return () => clearInterval(interval);
    })

    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>Total Collection</Typography>
                    </AppBar>

                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <CollectedToday collectedCount={collectedCount}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <CollectedThisMonth collectedCountThisMonth ={collectedCountThisMonth}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <CollectedThisYear collectedCountThisYear={collectedCountThisYear}/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <CollectedRecord collectedSorted={collectedSorted}/>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <CollectedWasteType/>
                        </Grid>
                    </Grid>

                </Container>
            </section>
        </div>
    )
}

export default Total_Analytics