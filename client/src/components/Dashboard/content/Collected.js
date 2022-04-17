import React, {useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import collected_logo from './collected_logo.png'

const Collected = ({totalValue}) => {
    const classes = useStyles()
    const nav = useNavigate()

    const goToTotalAnalytics = () => {
        nav('/total_analytics')
    }

    return (
        <div>
            <ButtonBase className={classes.cardAction} onClick={goToTotalAnalytics}>
                <Paper style={{ padding: '30px', borderRadius: '15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <center>
                                <Typography variant="h6" component="h6">Total Today</Typography>
                                <Divider style={{ margin: '5px 0' }} />
                                <img className={classes.media} src={ collected_logo } alt="collected" />
                                <Typography variant='p'><strong> {totalValue? (totalValue): "0"} </strong>kg</Typography>
                            </center>
                        </div>
                    </div>
                </Paper>
            </ButtonBase>
        </div>
    )
}

export default Collected