import React, {useEffect,useState} from 'react'

import {useNavigate} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider} from '@material-ui/core'
// import bio_logo from './bio_logo.png'

const NonBioThisMonth = ({nonBioCountThisMonth}) => {
    const classes = useStyles()

    return (
        <div>
            <Paper style={{ padding: '30px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Biodegradables This Month</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                            {/* <img className={classes.media} src={ bio_logo } alt="biodegradable" /> */}
                            <Typography variant='p'> <strong>{nonBioCountThisMonth? (nonBioCountThisMonth): "0"}</strong> kg</Typography>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default NonBioThisMonth