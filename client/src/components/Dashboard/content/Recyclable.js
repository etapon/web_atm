import React from 'react'

import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import recyclable_logo from './recyclable_logo.png'

const Recyclable = ({recyclable}) => {
    const classes = useStyles()
    const nav = useNavigate()

    const gotRecyclabeAnalytics = () => {
        nav('/recyclable_analytics')
    }

    return (
        <div>
            <ButtonBase className={classes.cardAction} onClick={gotRecyclabeAnalytics}>
                <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <center>
                                <Typography variant="h6" component="h6">Recyclables Day</Typography>
                                <Divider style={{ margin: '5px 0' }} />
                                <img className={classes.media} src={ recyclable_logo } alt="recyclable" />
                                <Typography variant='h4'><strong> {recyclable?  (recyclable): "0"} </strong>kg</Typography>
                            </center>
                        </div>
                    </div>
                </Paper>
            </ButtonBase>
        </div>
    )
}

export default Recyclable