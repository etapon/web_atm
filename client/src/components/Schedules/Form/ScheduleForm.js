import React, {useState,  useEffect} from 'react'
import { TextField, Button, Typography, Paper, Select, MenuItem, Grid } from '@material-ui/core';

import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createSchedule, updateSchedule } from '../../../redux/actions/schedule';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Streets } from '../Streets';

const ScheduleForm = ({scheduleId, setScheduleId}) => {
    const nav = useNavigate();
    const { collectors } = useSelector((state) => state.auth)
    const schedule = useSelector((state) => scheduleId ? state.schedule.schedules.find((s) => s._id === scheduleId): null)
    const [scheduleData, setScheduleData] = useState({street: '', startBiodegradable: '', endBiodegradable: '', startNonBiodegradable: '', endNonBiodegradable: '', startRecyclable: '', endRecyclable: '', cover: ''});

    const classes = useStyles();
    const dispatch = useDispatch();
    console.log(collectors)
    useEffect(()=> {
        if(schedule) setScheduleData(schedule);
        console.log(schedule)
        console.log(scheduleData)
    }, [schedule])

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
    const [streetSelect, setStreetSelect] = useState('')
    const handleChangeSelect = (event) => {
        setStreetSelect(event.target.value)
        console.log(event.target.value)
        console.log(streetSelect)
        setScheduleData({...scheduleData, [event.target.name]: event.target.value});
    };

    const[collectorSelect, setCollectorSelect] = useState('')
    const handleCollectorChange = (event) => {
        setCollectorSelect(event.target.value)
        console.log(event.target.value)
        console.log(collectorSelect)
        setScheduleData({...scheduleData, [event.target.name]: event.target.value});
    }

    const clear = () => {
        setScheduleId(null);
        setScheduleData({street: '', startBiodegradable: '', endBiodegradable: '', startNonBiodegradable: '', endNonBiodegradable: '', startRecyclable: '', endRecyclable: '', cover: ''})
    }
    
    return (
        <>
            <div className='page-section'>
                <div className='container mt-5'>
                    <Paper className={classes.paper} elevation={6}>
                        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            <Typography variant='h6'>{scheduleId ? 'Updating a Schedule' : 'Creating a Schedule'}</Typography>
                            
                            <Grid container spacing={3}>

                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        id="startBiodegradable" name="startbiodegradable" label="Start Biodegradable" required variant='filled' fullWidth type="time"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }} value={scheduleData.startBiodegradable} onChange={(e) => setScheduleData({ ...scheduleData, startBiodegradable: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        id="endBiodegradable" name="endbiodegradable" label="End Biodegradable" required variant='filled' fullWidth type="time"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }} value={scheduleData.endBiodegradable} onChange={(e) => setScheduleData({ ...scheduleData, endBiodegradable: e.target.value})}
                                    />
                                </Grid>


                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        id="startNon-biodegradable" name="startNonBiodegradable" label="Start non-Biodegradable" required variant='filled' fullWidth type="time"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                        value={scheduleData.startNonBiodegradable} onChange={(e) => setScheduleData({ ...scheduleData, startNonBiodegradable: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        id="endNon-biodegradable" name="endNonBiodegradable" label="End non-Biodegradable" required variant='filled' fullWidth type="time"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                        value={scheduleData.endNonBiodegradable} onChange={(e) => setScheduleData({ ...scheduleData, endNonBiodegradable: e.target.value})}
                                    />
                                </Grid>


                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        id="startRecyclable" name="startRecyclable" label="startRecyclable" required variant='filled' fullWidth type="time"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                        value={scheduleData.startRecyclable} onChange={(e) => setScheduleData({ ...scheduleData, startRecyclable: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                            id="endRecyclable" name="endRecyclable" label="endRecyclable" required variant='filled' fullWidth type="time"
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            inputProps={{
                                            step: 300, // 5 min
                                            }}
                                            sx={{ width: 150 }}
                                            value={scheduleData.endRecyclable} onChange={(e) => setScheduleData({ ...scheduleData, endRecyclable: e.target.value})}
                                    />
                                </Grid>
                            </Grid>
                            

                            

                            

                            {/* <TextField name='biodegradable' required variant='filled' label='biodegradable collection time' fullWidth value={scheduleData.biodegradable} multiline rows={2} onChange={(e) => setScheduleData({ ...scheduleData, biodegradable: e.target.value})}/> */}
                            {/* <TextField name='non-biodegradable' required variant='filled' label='non-biodegradable collection time' fullWidth value={scheduleData.nonBiodegradable} multiline rows={2} onChange={(e) => setScheduleData({ ...scheduleData, nonBiodegradable: e.target.value})}/>
                            <TextField name='recyclable' required variant='filled' label='recyclable collection time' fullWidth value={scheduleData.recyclable} multiline rows={2} onChange={(e) => setScheduleData({ ...scheduleData, recyclable: e.target.value})}/> */}
                            <Typography variant="body1" component="p">Choose Street:</Typography>
                            <Select
                                    name='street'
                                    required
                                    label='Street'
                                    value={streetSelect}
                                    onChange={handleChangeSelect}
                                    variant='filled'
                                    fullWidth
                                >
                                {Streets.map((streets) => (
                                    <MenuItem key={streets.street} value={streets.street}>{streets.street}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="body1" component="p">Assign Collector:</Typography>
                            <Select
                                name='collector'
                                required
                                label='Collector'
                                value={collectorSelect}
                                onChange={handleCollectorChange}
                                variant='filled'
                                fullWidth
                            >
                                {collectors.map((collector) => (
                                    <MenuItem key={collector._id} value={collector._id}>{collector.name}</MenuItem>
                                ))}
                            </Select>

                            <div className={classes.fileInput}>
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({base64}) => setScheduleData({ ...scheduleData, cover: base64})}
                                />
                            </div>
                            <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
                            <Button className={classes.buttonSubmit} variant="contained" color="primary" onClick={clear} fullWidth>Clear</Button>
                            
                        </form>
                    </Paper>
                </div>
            </div>
            
        </>
    )
}

export default ScheduleForm;
