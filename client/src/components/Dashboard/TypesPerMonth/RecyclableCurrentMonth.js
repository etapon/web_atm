import React from 'react'

import { Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import recyclable_logo from './recyclable_logo.png'

const RecyclableCurrentMonth = ({recyclableCount}) => {
  const classes = useStyles();

  return (
    <div>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h5" component="h2">Recyclable this Month</Typography>
                            <Typography variant='h4'>{recyclableCount} kg</Typography>
                        
                            <div className={classes.imageSection}>
                                <img className={classes.media} src={ recyclable_logo } alt="recyclable" />
                            </div>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
  )
}

export default RecyclableCurrentMonth