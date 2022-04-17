import React from 'react'

import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import { Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import non_bio_logo from './non_bio_logo.png'

const NonBiodegradable = ({nonBio}) => {
    const classes = useStyles()
    const nav = useNavigate()

    const goToNonBioAnalytics = () => {
        nav('/nonBio_analytics')
    }

    return (
        <div>
            <ButtonBase className={classes.cardAction} onClick={goToNonBioAnalytics}>
                <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <center>
                                <Typography variant="h6" component="h6">non-Biodegradables Day</Typography>
                                <Divider style={{ margin: '5px 0' }} />
                                <img className={classes.media} src={ non_bio_logo } alt="non-biodegradable" />
                                <Typography variant='h4'><strong> {nonBio? (nonBio): "0"} </strong>kg</Typography>
                                
                            </center>
                        </div>
                    </div>
                </Paper>
            </ButtonBase>
        </div>
    )
}

export default NonBiodegradable