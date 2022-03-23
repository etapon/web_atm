import React, {useEffect, useState} from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { CircularProgress, Grid, Paper, AppBar, TextField, Button, Container, Typography} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import AddIcon from '@material-ui/icons/Add'
import useStyles from './styles'

import Announcement from './Announcement/Announcement'
import Pagination from './Pagination/Pagination'

import {getAnnouncementsBySearch} from '../../redux/actions/announcement'

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Announcements = ({setAnnouncementId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const nav = useNavigate()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [isAdmin, setIsAdmin] = useState(false)
    const {announcements, isLoading} = useSelector((state) => state.announcement)
    const [ announcementName, setAnnouncementName ] = useState('');

    useEffect(()=> {
        setUser(JSON.parse(localStorage.getItem('profile')));

        if(user?.result.role === 'admin'){
            setIsAdmin(true)
        }

    }, [location])

    const handleAdd = () => {
        setAnnouncementId(null)
        nav('/announcementsForm')
    }

    const searchAnnouncement = () => {
        if(announcementName.trim()){
            dispatch(getAnnouncementsBySearch({announcementName}))
            nav(`/announcements/search?searchQuery=${announcementName || 'none'}`)
        } else {
            nav('/announcements')
        }
    }

    return (
        <div className='container'>
            <section className="page-section">
                    <Container maxWidth='xl'>
                        <AppBar className={classes.appBar} position='static' color ='inherit'>
                            <Typography variant = 'h4'>Announcements</Typography>
                        </AppBar>
                        <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        
                            {isLoading? <CircularProgress/> : (
                            <>
                                <Grid item xs={12} sm={6} md={9}>
                                    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                                        {announcements.map((announcement) => (
                                            <Grid key={announcement._id} xs={12} sm={12} md={12} lg={12} item>
                                                <Announcement announcement={announcement} setAnnouncementId={setAnnouncementId} isAdmin={isAdmin}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </>
                            )}
                        
                                <Grid item xs={12} sm={6} md={3}>
                                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                    <TextField
                                        name ='search'
                                        variant = 'filled'
                                        label = 'Search By Street'
                                        fullWidth
                                        value={announcementName}
                                        onChange={(e)=>setAnnouncementName(e.target.value)}
                                    />
                                    <Button variant='contained' color='primary' onClick={searchAnnouncement} startIcon={<SearchIcon/>} >Search</Button>

                                    {isAdmin? (
                                    <Button className='mt-2' variant='contained' color='primary'startIcon={<AddIcon />} onClick={handleAdd}>Announcement</Button>
                                    ):(<></>)}
                                    
                                </AppBar>
                                {searchQuery ? (<></>): (
                                    <Paper elevation={6}>
                                        <Pagination page={page} className={classes.pagination}/>
                                    </Paper>
                                )}

                            </Grid>
                        </Grid>
                    </Container>
            </section>
        </div>
    );
};

export default Announcements;
