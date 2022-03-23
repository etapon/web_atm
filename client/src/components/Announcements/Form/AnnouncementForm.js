import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper, Select, MenuItem} from '@material-ui/core'
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { createAnnouncement, updateAnnouncement } from '../../../redux/actions/announcement'

import { Streets } from './Streets'
import { defaultAnnouncementImage } from './defaultResources'

const AnnouncementForm = ({announcementId, setAnnouncementId}) => {
    const nav = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();

    const { barangays } = useSelector((state) => state.barangay)
    const announcement = useSelector((state) => announcementId ? state.announcement.announcements.find((a) => a._id === announcementId): null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [announcementData, setAnnouncementData] = useState({
        creator: '', title: '', message: '', street: '', selectedFile: '', profile: ''
    })

    useEffect(()=> {
        if(announcement) setAnnouncementData(announcement);
        setUser(JSON.parse(localStorage.getItem('profile')));
        console.log(announcement)
        // setAnnouncementData({...announcementData, title: announcement.title, street: announcement.street, selectedFile: announcement.selectedfile})
        
    }, [announcement])

    useEffect(()=> {
        if(announcement){
            setAnnouncementData({...announcementData, title: announcement.title, message: announcement.message, street: announcement.street, selectedFile: announcement.selectedfile, creator: user.result?.name, profile: user.result?.image, selectedFile: defaultAnnouncementImage})

        } else {
            setAnnouncementData({...announcementData, creator: user.result?.name, profile: user.result?.image, selectedFile: defaultAnnouncementImage})

        }
    },[user])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(announcementId){
            dispatch(updateAnnouncement(announcementId, announcementData))
        }else{
            dispatch(createAnnouncement(announcementData))
        }
        nav(`/announcements`)
        clear()
    }
    const clear = () => {
        setAnnouncementId(null)
        setAnnouncementData({creator: '', title: '', message: '', street: '', selectedFile: ''})
    }

    const [streetSelect, setStreetSelect] = useState('')
    const handleChangeSelect = (event) => {
        setStreetSelect(event.target.value)
        setAnnouncementData({...announcementData, [event.target.name]: event.target.value});
    };

    return (
        <div className='page-section'>
            <div className='container mt-5'>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        <Typography variant='h6' paragraph>{announcementId ? 'Updating an Announcement' : 'Creating an Announcement'}: {announcementData.creator}</Typography>
                        
                        <TextField name='title' required variant='filled' label='announcement title' fullWidth value={announcementData.title} multiline rows={2} onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value})}/>
                        <TextField name='message' required variant='filled' label='message' fullWidth value={announcementData.message} multiline rows={4} onChange={(e) => setAnnouncementData({ ...announcementData, message: e.target.value})}/>
                        
                        <Typography variant="body1" component="p">Select Street:</Typography>
                        <Select
                                name='street'
                                required
                                label='Street'
                                value={streetSelect}
                                onChange={handleChangeSelect}
                                variant='filled'
                                fullWidth
                            >
                            {Streets.map((street) => (
                                <MenuItem key={street.street} value={street.street}>{street.street}</MenuItem>
                            ))}
                        </Select>

                        <div className={classes.fileInput}>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({base64}) => setAnnouncementData({ ...announcementData, selectedFile: base64})}
                            />
                        </div>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" onClick={clear} fullWidth>Clear</Button>
                        
                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default AnnouncementForm;
