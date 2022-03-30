import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, Select, MenuItem, Grid, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'

import {Streets} from './Streets'

import { createSchedule, updateSchedule } from '../../../redux/actions/schedule';

const SchedForm = ({scheduleId, setScheduleId}) => {
    const classes = useStyles()
    const nav = useNavigate()
    const dispatch = useDispatch()

    const { collectors } = useSelector((state) => state.auth)
    const schedule = useSelector((state) => scheduleId ? state.schedule.schedules.find((s) => s._id === scheduleId): null)
    const [displayedQueue, setDisplayedQueue] = useState('Please add street')
    const [scheduleData, setScheduleData] = useState(
        {
            day: '',
            type: '',
            startOfCollection: '',
            collector: '',
            queue:[]
        });
    var concatinatedStreet;
    const [queueArray, setQueueArray] = useState({queue: []})
    
    useEffect(()=> {
        if(scheduleId){
            setDaySelect(schedule.day)
        }
        
    }, [scheduleId])

        const [daySelect, setDaySelect] = useState('select-day')
        const handleDaySelect = (event) => {
            setDaySelect(event.target.value)
            setScheduleData({...scheduleData, [event.target.name]: event.target.value});
        };

        const [streetSelect, setStreetSelect] = useState('select-street')
        const handleStreetSelect = (event) => {
            setStreetSelect(event.target.value)
            // setScheduleData({...scheduleData, [event.target.name]: event.target.value});
        };

        const [typeSelect, setTypeSelect] = useState('select-type')
        const handleTypeSelect = (event) => {
            setTypeSelect(event.target.value)
            console.log(event.target.name)
            console.log(event.target.value)
            setScheduleData({...scheduleData, [event.target.name]: event.target.value});
        };

        const [collectorSelect, setCollectorSelect] = useState('select-collector')
        const handleCollectorSelect = (event) => {
            setCollectorSelect(event.target.value)
            setScheduleData({...scheduleData, [event.target.name]: event.target.value});
        };

        const handleAddQueue = () => {
            // console.log(scheduleData.queue)
            scheduleData.queue.push(streetSelect)
            
            var selected = scheduleData.queue;
            
            var numbering;
            // console.log(selected)

            selected.forEach(street => {
                if(concatinatedStreet == null){
                    numbering = 1;
                    concatinatedStreet = numbering+".) "+street
                } else{
                    numbering = numbering + 1;
                    concatinatedStreet = concatinatedStreet+ "\n" + numbering+".) "+street
                }
            });
            
            setDisplayedQueue(concatinatedStreet)
        }

        const clearQueue = () => {
            setDisplayedQueue('Please add street')
            concatinatedStreet = null
            console.log(concatinatedStreet)
            scheduleData.queue = []
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(scheduleId){
            console.log(scheduleData)
            dispatch(updateSchedule(scheduleId, scheduleData))
        }else{
            console.log(scheduleData)
            dispatch(createSchedule(scheduleData))
        }
        nav(`/schedules`)
        clear()
    }

    const clear = () => {
        setScheduleId(null);
        setScheduleData( {
            day: '',
            type: '',
            startOfCollection: '',
            collector: '',
            queue:[]
        })
    }

    return (
        <>
            <div className='page-section'>
                    <div className='container mt-5'>
                        <Paper className={classes.paper} elevation={6}>
                            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            
                                <Typography variant='h5'>{scheduleId ? 'Updating a Schedule' : 'Creating a Schedule'}</Typography>
                                {scheduleId? 
                                <Select
                                        inputProps={{ readOnly: true }}
                                        disabled = {true}
                                        className='mb-5 mt-4'
                                        name='day'
                                        required
                                        label='Day of Collection'
                                        value={daySelect}
                                        onChange={handleDaySelect}
                                        fullWidth
                                        variant='filled'
                                    >
                                        <MenuItem value="Monday">Monday</MenuItem>
                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                        <MenuItem value="Friday">Friday</MenuItem>
                                        <MenuItem value="Saturday">Saturday</MenuItem>
                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                </Select>
                                :
                                <Select
                                        className='mb-5 mt-4'
                                        name='day'
                                        required
                                        label='Day of Collection'
                                        value={daySelect}
                                        onChange={handleDaySelect}
                                        fullWidth
                                        variant='filled'
                                    >
                                        <MenuItem value="Monday">Monday</MenuItem>
                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                        <MenuItem value="Friday">Friday</MenuItem>
                                        <MenuItem value="Saturday">Saturday</MenuItem>
                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                </Select>    
                                }
                                <Grid container spacing={3}>
                    
                                    <Grid item xs={12} lg={6}>
                                        <TextField name='message' required label='Queue of Streets' variant='filled' inputProps={{ readOnly: true, }} fullWidth multiline rows={14} value={displayedQueue}/>
                                        <Button className={classes.buttonSubmit} variant="contained" color="primary" onClick={clearQueue} fullWidth>Clear queue</Button>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={9} lg={9}>
                                                <Select
                                                        name='street'
                                                        required
                                                        label='Day of Collection'
                                                        value={streetSelect}
                                                        onChange={handleStreetSelect}
                                                        fullWidth
                                                        variant='filled'
                                                    >
                                                        {Streets.map((street) => (
                                                        <MenuItem key={street.street} value={street.street}>{street.street}</MenuItem>
                                                        ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={3} lg={3}>
                                                <Button className={classes.buttonSubmit} variant="contained" color="primary" onClick={handleAddQueue} fullWidth>add</Button>
                                            </Grid>
                                            <Grid item xs={12} lg={12}>
                                            <Typography variant="body1" component="p">Garbage Type:</Typography>
                                                <Select
                                                        name='type'
                                                        required
                                                        label='type of Collection'
                                                        value={typeSelect}
                                                        onChange={handleTypeSelect}
                                                        fullWidth
                                                        variant='filled'
                                                    >
                                                        <MenuItem value="Biodegradable">Biodegradable</MenuItem>
                                                        <MenuItem value="non-Biodegradable">non-Biodegradable</MenuItem>
                                                        <MenuItem value="Recyclable">Recyclable</MenuItem>
                                                </Select>         
                                            </Grid>
                                            <Grid item xs={12} lg={12}>
                                                <TextField
                                                    id="collectionStart" name="collectionStart" label="Start of Collection" required variant='filled' fullWidth type="time"
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    inputProps={{
                                                    step: 300, // 5 min
                                                    }}
                                                    sx={{ width: 150 }}
                                                    value={scheduleData.startNonBiodegradable} onChange={(e) => setScheduleData({ ...scheduleData, startOfCollection: e.target.value})}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={12}>
                                            <Typography variant="body1" component="p">Assign Collector:</Typography>
                                                <Select
                                                    name='collector'
                                                    required
                                                    label='Collector'
                                                    value={collectorSelect}
                                                    onChange={handleCollectorSelect}
                                                    variant='filled'
                                                    fullWidth
                                                >
                                                    {collectors.map((collector) => (
                                                        <MenuItem key={collector._id} value={collector._id}>{collector.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth>Submit</Button>

                            </form>
                        </Paper>
                    </div>
            </div>
        </>
    )
}

export default SchedForm