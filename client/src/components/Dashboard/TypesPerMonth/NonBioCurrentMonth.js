import React from 'react'

import { Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import non_bio_logo from './non_bio_logo.png'

const NonBioCurrentMonth = ({nonBioCount}) => {
  const classes = useStyles();

  return (
    <div>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h5" component="h2">non-Biodegradable this Month</Typography>
                            <Typography variant='h4'>{nonBioCount} kg</Typography>
                            <div className={classes.imageSection}>
                                <img className={classes.media} src={ non_bio_logo } alt="non-biodegradable" />
                            </div>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
  )
}

export default NonBioCurrentMonth