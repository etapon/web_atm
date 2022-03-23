import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Paper, Typography, CircularProgress, Button, Divider, Modal, Select, MenuItem, Box} from '@material-ui/core';

import useStyles from './styles'
import infographic from './infographic.jpg'
import { getSchedule } from '../../../redux/actions/schedule';

const ScheduleDetails = () => {
    
    const { id } = useParams()
    const classes = useStyles()
    const dispatch = useDispatch()

    const { schedule, isLoading } = useSelector((state) => state.schedule)

    useEffect(()=> {
        console.log("hey hey hey na receive naman yung id oh")
        dispatch(getSchedule(id))
    }, [id])

    console.log(schedule)

    if(!schedule){
        return null
    }

    return (
        <div className="container">
            <section className="page-section mt-5">
                {!isLoading? (
                    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                        <div className={classes.card}>
                            <div className={classes.section}>
                                <Typography variant="h3" component="h2">{schedule.result.day}</Typography>
                                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{schedule.result.type}</Typography>
                                <Divider style={{ margin: '20px 0' }} />
                                <Typography gutterBottom variant="body1" component="p">collector: <strong>{schedule.result.collector.name}</strong></Typography>
                                <Typography gutterBottom variant="body1" component="p">start of collection: <strong>{schedule.result.startOfCollection}</strong></Typography>
                                <Divider style={{ margin: '20px 0' }} />
                                <Typography gutterBottom variant="body1" component="h5">List of Barangay's</Typography>
                                <ul>
                                    {schedule.result.queue.map((schedule) => (
                                        <li>{schedule}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={classes.imageSection}>
                                <img className={classes.media} src={infographic} alt='alt' />
                            </div>
                        </div>
                    </Paper>
                ): null}
            </section>
        </div>
    )
}

export default ScheduleDetails