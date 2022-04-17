import React, {useEffect,useState} from 'react'

import {useNavigate} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider } from '@material-ui/core'
import residentIcon from './resident_icon.png'

const ResidentCount = ({residentCount}) => {
    const classes = useStyles()
    const nav = useNavigate()

    return (
        <div>
            <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Resident users Count</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                            <img className={classes.media} src={ residentIcon } alt="biodegradable" />
                            <Typography variant='h4'> <strong>{residentCount? (residentCount): "0"}</strong></Typography>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default ResidentCount