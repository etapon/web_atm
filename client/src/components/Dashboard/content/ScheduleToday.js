import React from 'react'
import {useNavigate} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import CalendarToday from '@material-ui/icons/CalendarToday'

const ScheduleToday = ({streets}) => {
    const classes = useStyles()

    if(streets == null){
        return null
    }

    return (
        <div>
            {/* <ButtonBase className={classes.cardAction} onClick={goToBioAnalytics}> */}
                <Paper style={{ padding: '5px', borderRadius: '15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <center>
                                <Typography variant="h6" component="h6">Streets to collect today</Typography>
                                <Divider style={{ margin: '5px 0' }} />
                            </center>
                                <ul>
                                    {streets.map((street) => (
                                        <li className={classes.listOfStreets} > <CalendarToday/>{street}, </li>
                                    ))
                                    }
                                </ul>
                                    
                                {/* <img className={classes.media} src={ bio_logo } alt="biodegradable" /> */}
                                {/* <Typography variant='p'> <strong>{bio? (bio): "0"}</strong> kg</Typography> */}
                            
                        </div>
                    </div>
                </Paper>
            {/* </ButtonBase> */}
        </div>
    )
}

export default ScheduleToday