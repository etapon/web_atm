import React, {useEffect,useState} from 'react'

import {useNavigate} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import bio_logo from './bio_logo.png'

const Biodegradable = ({bio}) => {
    const classes = useStyles()
    const nav = useNavigate()

    const goToBioAnalytics = () => {
        nav('/bio_analytics')
    }

    return (
        <div>
            <ButtonBase className={classes.cardAction} onClick={goToBioAnalytics}>
                <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <center>
                                <Typography variant="h6" component="h6">Biodegradables Day</Typography>
                                <Divider style={{ margin: '5px 0' }} />
                                <img className={classes.media} src={ bio_logo } alt="biodegradable" />
                                <Typography variant='h4'> 
                                        <strong>{bio? (bio): "0"}</strong> kg
                                </Typography>
                            </center>
                        </div>
                    </div>
                </Paper>
            </ButtonBase>
        </div>
    )
}

export default Biodegradable