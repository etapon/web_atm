import React, {useEffect, useState} from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CircularProgress, Grid, Paper, AppBar, TextField, Button, Container, Typography} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import AddIcon from '@material-ui/icons/Add'
import useStyles from './styles'

import Announcement from './Announcement/Announcement'
import Pagination from './Pagination/Pagination'

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Announcements = ({setAnnouncementId}) => {
    const classes = useStyles()
    const location = useLocation()
    const nav = useNavigate()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [isAdmin, setIsAdmin] = useState(false)
    const {announcements, isLoading} = useSelector((state) => state.announcement)

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

    console.log(isLoading)
    console.log(announcements)

    return (
        <>
            <section className="page-section">
                    <Container maxWidth='xl'>
                        <AppBar className={classes.appBar} position='static' color ='inherit'>
                            <Typography variant = 'h3'>Announcements</Typography>
                        </AppBar>
                        <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        
                            {isLoading? <CircularProgress/> : (
                            <>
                                <Grid item xs={12} sm={6} md={9}>
                                    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                                        {announcements.map((announcement) => (
                                            <Grid key={announcement._id} xs={12} sm={12} md={12} lg={12} item>
                                                <Announcement announcement={announcement} setAnnouncementId={setAnnouncementId}/>
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
                                        label = 'Search Announcement'
                                        fullWidth
                                        // value={producerName}
                                        // onKeyPress={handleKeyPress}
                                        // onChange={(e)=>setProducerName(e.target.value)}
                                    />
                                    <Button variant='contained' color='primary' startIcon={<SearchIcon/>}>Search</Button>

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
        </>
    );
};

export default Announcements;
