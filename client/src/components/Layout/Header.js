import React, { useState, useEffect } from 'react'

import {Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import { getUsers, getCollectors } from '../../redux/actions/auth'
import { getBarangays } from '../../redux/actions/barangay';

//styles
import './App.css'

import './Scripts'
import useStyles from './styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ScheduleIcon from '@material-ui/icons/Schedule.js'
import {ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown} from  'reactstrap'
import { Button, Avatar } from '@material-ui/core'
import mainLogo from '../../etm_logo.png'



const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const nav = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const classes = useStyles()
    const [ showNav, setShowNav ] = useState(true)

    useEffect(()=> {
        dispatch(getUsers()) 
        dispatch(getBarangays())
        dispatch(getCollectors())

        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));

        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        console.log('ok dito yung barangay')

    }, [location])

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
        nav('/');
        setUser(null);
    }

    const goToDashBoard = () => {
        nav('/dashboard')
    }

    const goToUsers = () => {
        nav('/users')
    }

    const goToAccount = () => {
        nav('/account')
    }

    const goToAuth = () => {
        nav('/auth')
    }

    const handleShow = () => {
        setShowNav(true)
    }

    const goToAnalytics = () => {
        nav('/analytics')
    }

    const goToReports = () => {
        nav('/reports')
    }

    const goToToday = () => {
        nav('/scheduleDisplay')
    }

    const goToSchedules = () => {
        nav('/schedules')
    }

    return (
        <div>
             <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand" to='/'> <img src={mainLogo} alt='mainLogo' style={{width:50}}/> E-TAPON MO!</Link>
                    <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setShowNav(!showNav)}>
                        Menu
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        {showNav? <>
                            <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-0 mx-lg-1 mt-2"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/">Home</Link></li>
                            <li className="nav-item mx-0 mx-lg-1">
                                    <ButtonDropdown>
                                        <UncontrolledDropdown>
                                            <div className="nav-link py-2 px-0 px-lg-3 rounded">
                                                <DropdownToggle nav className={classes.dropdown}> 
                                                    <div className='mt-2'><ScheduleIcon/>&nbsp;&nbsp;Schedules<ArrowDropDownIcon/></div>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={goToToday}>Today</DropdownItem>
                                                    <DropdownItem onClick={goToSchedules}>All Sched</DropdownItem>
                                                </DropdownMenu>
                                            </div>
                                        </UncontrolledDropdown>
                                    </ButtonDropdown>
                                </li>
                            {/* <li className="nav-item mx-0 mx-lg-1 mt-2"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/scheduledisplay">Today</Link></li>
                            <li className="nav-item mx-0 mx-lg-1 mt-2"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/schedules">Schedules</Link></li> */}
                            {user ? (<><li className="nav-item mx-0 mx-lg-1 mt-2"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/announcements">Announcements</Link></li>
                            </>):(<></>)}
                            {user? (
                            <>
                                <li className="nav-item mx-0 mx-lg-1">
                                
                                    <ButtonDropdown>
                                        <UncontrolledDropdown>
                                            <div className="nav-link py-2 px-0 px-lg-3 rounded">
                                                <DropdownToggle nav className={classes.dropdown}> 
                                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.image}>{user.result.name.charAt(0)}</Avatar>&nbsp;&nbsp;{user.result.name} <ArrowDropDownIcon/>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={goToAccount}>Account</DropdownItem>
                                                    {user.result.role == 'admin' ? (<DropdownItem onClick={goToDashBoard}>Dashboard</DropdownItem>):(<></>)}
                                                    {user.result.role == 'admin' ? (<DropdownItem onClick={goToAnalytics}>Analytics</DropdownItem>):(<></>)}
                                                    {user.result.role == 'admin' ? (<DropdownItem onClick={goToReports}>Reports</DropdownItem>):(<></>)}
                                                    {user.result.role == 'admin' ? (<DropdownItem onClick={goToUsers}>Users</DropdownItem>):(<></>)}
                                                    {user.result.role == 'admin' ? (<hr className='dropdown-divider'/>):(<></>)}
                                                    <DropdownItem onClick={handleLogout}>Log Out</DropdownItem>
                                                </DropdownMenu>
                                            </div>
                                        </UncontrolledDropdown>
                                    </ButtonDropdown>
                                </li>
                            </>): (
                                <Button variant='contained' color='primary' onClick={goToAuth}>Sign In</Button>
                            )}
                            </ul>
                        </>: null}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
