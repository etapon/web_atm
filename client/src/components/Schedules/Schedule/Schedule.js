import React, { useState, useEffect } from 'react'

import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Divider} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { deleteSchedule } from '../../../redux/actions/schedule'

const Schedule = ({schedule, isAdmin, setScheduleId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleEdit = () => { 
        setScheduleId(schedule._id)
        nav('/schedForm')
    }

    const openSchedule = () => {
        nav(`/schedule/${schedule._id}`)
    }

    return (
        <>
            <Card className={classes.card}>
                <ButtonBase className={classes.cardAction} onClick={openSchedule}>
                    <CardMedia className={classes.media} image={ "https://www.cnn.ph/.imaging/mte/demo-cnn-new/750x450/dam/cnn/2021/2/4/Pasay-City-Logo_CNNPH.jpg/jcr:content/Pasay-City-Logo_CNNPH.jpg"} title={schedule.street}/>
                   
                    <div className={classes.overlay}>
                        <Typography variant="h4" color="inherit">{schedule.day}</Typography>
                        
                    </div>
                    <CardContent>
                        <Typography color='textSecondary' variant="h6">Assigned collector: <strong>{schedule.collector.name}</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography color='textSecondary' component='p'>Type: <strong>{schedule.type}</strong></Typography>
                        <Typography color='textSecondary' component='p'>Start of collection: <strong>{schedule.startOfCollection}</strong></Typography>
                    </CardContent>

                </ButtonBase>
                {isAdmin? (
                    <CardActions className={classes.cardActions}>
                        <Button size="small" color="primary" onClick={handleEdit} >
                            <EditIcon fontSize='small'/>
                            Edit
                        </Button>
                        <Button size="small" color="primary" onClick={()=> dispatch(deleteSchedule(schedule._id))}>
                            <DeleteIcon fontSize='small'/>
                            Delete
                        </Button>
                    </CardActions>
                ): (<></>)}
            </Card>
        </>
    )
}

export default Schedule;