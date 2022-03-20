import React from 'react'

import { Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import bio_logo from './bio_logo.png'
const BioCurrentMonth = ({bioCount}) => {
  const classes = useStyles();

  return (
    <div>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h5" component="h2">Biodegradable this Month</Typography>
                            <Typography variant='h4'>{bioCount}kg</Typography>
                            <div className={classes.imageSection}>
                                <img className={classes.media} src={ bio_logo } alt="biodegradable" />
                            </div>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
  )
}

export default BioCurrentMonth