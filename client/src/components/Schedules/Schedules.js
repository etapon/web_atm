import React, {useState, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import useStyles from './styles'
import { CircularProgress, Grid, Paper, AppBar, TextField, Button, Container, Typography} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import AddIcon from '@material-ui/icons/Add'

import Pagination from './Pagination/Pagination'
import Schedule from './Schedule/Schedule'

import { getSchedulesBySearch } from '../../redux/actions/schedule'

function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Schedules = ({setScheduleId}) => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [isAdmin, setIsAdmin] = useState(false)
    const location = useLocation()
    const [scheduleName, setScheduleName] = useState()
    const {schedules, isLoading} = useSelector((state) => state.schedule)
    
    useEffect(()=> {
        setUser(JSON.parse(localStorage.getItem('profile')));

        if(user?.result.role === 'admin'){
            setIsAdmin(true)
        }

    }, [location])

    const handleAdd = () => {
        setScheduleId(null)
        nav('/schedForm')
    }

    const searchSchedule = () => {
        if(scheduleName.trim()){
            dispatch(getSchedulesBySearch({scheduleName}))
            nav(`/schedules/search?searchQuery=${scheduleName || 'none'}`)
        } else {
            nav('/schedules')
        }
    }

    return (
        <div className="container">
             <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>Waste Collecting Schedules</Typography>
                    </AppBar>
                    <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        {isLoading? <CircularProgress/> : (
                        <>
                            <Grid item xs={12} sm={6} md={9}>
                                <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                                    {schedules.map((schedule) => (
                                        <Grid key={schedule._id} xs={12} sm={12} md={6} lg={4} item>
                                            <Schedule schedule={schedule} isAdmin={isAdmin} setScheduleId={setScheduleId}/>
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
                                    label = 'Search Schedule'
                                    fullWidth
                                    value={scheduleName}
                                    onChange={(e)=>setScheduleName(e.target.value)}
                                />
                                <Button variant='contained' color='primary' startIcon={<SearchIcon/>} onClick={searchSchedule}>Search</Button>

                                {isAdmin? (
                                <Button className='mt-2' variant='contained' color='primary'startIcon={<AddIcon />} onClick={handleAdd}>Schedule</Button>
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
    )
}

export default Schedules
