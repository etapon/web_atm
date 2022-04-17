import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Container} from '@material-ui/core'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import useStyles from './styles'
import {useSelector} from 'react-redux'

import Home from './components/Home/home'
import AppPage from './components/Home/AppPage/AppPage'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

import Auth from './components/Auth/Auth'
import Users from './components/Users/Users'
import Account from './components/Users/Account'
import Schedules from './components/Schedules/Schedules'
import ScheduleDetails from './components/Schedules/ScheduleDetails/ScheduleDetails'
import SchedForm from './components/Schedules/Form/SchedForm'
import ScheduleForm from './components/Schedules/Form/ScheduleForm'
import Dashboard from './components/Dashboard/Dashboard'
import Reports from './components/Reports/Reports'
import Announcements from './components/Announcements/Announcements'
import AnnouncementForm from './components/Announcements/Form/AnnouncementForm'
import { ToastProvider, useToasts, DefaultToast } from 'react-toast-notifications'

import Trashbin from './components/Collection/Trashbin/Trashbin'

import Biodegradable_Analytics from './components/Analytics/Biodegradable/Biodegradable_Analytics'
import NonBiodegradable_Analytics from './components/Analytics/NonBiodegradable/NonBiodegradable_Analytics'
import Recyclable_Analytics from './components/Analytics/Recyclable/Recyclable_Analytics'
import Total_Analytics from './components/Analytics/Total/Total_Analytics'
import Analytics from './components/Analytics/Analytics'

import ScheduleDisplay from './components/Schedules/ScheduleDisplay'
import Verification from './components/Auth/Verification'
import GoToEmail from './components/Auth/goToEmail'
import WasteTypes from './components/Home/WasteTypes/WasteTypes'

const App = () => {
    const [scheduleId, setScheduleId] = useState('')
    const [announcementId, setAnnouncementId] = useState('')
    const [user, setUser]  = useState(JSON.parse(localStorage.getItem('profile')));
    const { message, message_type } = useSelector((state) => state.message)
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setUser(JSON.parse(localStorage.getItem('profile')))
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    return (
        <div>
            {message ? (
            <ToastProvider placement='bottom-right'>
                <Toast message={message} message_type={message_type}/>
            </ToastProvider>):
            (<></>)}
            
            <BrowserRouter>
                <Header/>
                 
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/apppage' element={user? <AppPage/>: <Auth/> }/>
                    <Route path='/auth' element={<Auth/>}/>
                    {/* <Route path='/activate/:token' element={<Welcome/>}/> */}
                    
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/account' element={<Account/>}/>

                        <Route path='/schedules' element={<Schedules setScheduleId={setScheduleId} />}/>
                        <Route path='/schedule/:id' element={user? <ScheduleDetails/>: <Auth/>}/>
                        <Route path='/schedulesForm' element={user? <ScheduleForm scheduleId={scheduleId} setScheduleId={setScheduleId}/>: <Auth/>}/>
                        <Route path='/schedForm' element={user? <SchedForm scheduleId={scheduleId} setScheduleId={setScheduleId}/>: <Auth/>}/>
                        <Route path='/schedules/search' element={user? <Schedules/>: <Auth/>}/>

                        <Route path='/announcements' element={user? <Announcements setAnnouncementId={setAnnouncementId} />: <Auth/>}/>
                        <Route path='/announcementsForm' element={user? <AnnouncementForm announcementId={announcementId} setAnnouncementId={setAnnouncementId} />: <Auth/>}/>
                        <Route path='/announcements/search' element={user? <Announcements/>: <Auth/>}/>

                        <Route path='/trashbin' element={user? <Trashbin/>: <Auth/>}/>

                        <Route path='/dashboard' element={user? <Dashboard/>: <Auth/>}/>
                        <Route path='/analytics' element={user? <Analytics/>: <Auth/>}/>
                        <Route path='/bio_analytics' element={user? <Biodegradable_Analytics/>: <Auth/>}/>
                        <Route path='/nonBio_analytics' element={user? <NonBiodegradable_Analytics/>: <Auth/>}/>
                        <Route path='/recyclable_analytics' element={user? <Recyclable_Analytics/>: <Auth/>}/>
                        <Route path='/total_analytics' element={user? <Total_Analytics/>: <Auth/>}/>

                        <Route path='/reports' element={user? <Reports/>: <Auth/>}/>
                        <Route path='/scheduledisplay' element={<ScheduleDisplay/>}/>
                        <Route path='/user/:id/verify/:token' element={<Verification/>} />
                        <Route path='/goToEmail' element={<GoToEmail/>}/>
                        <Route path='/wasteTypes' element={<WasteTypes/>}/>
                </Routes>
                
            
            </BrowserRouter>
        </div>
    )
}

const Toast = ({message, message_type}) => {
    const  {addToast}  = useToasts()
    const classes = useStyles()
    useEffect(()=>{
        addToast(message, {
            appearance: message_type, autoDismiss: true
        })
    }, [message])

    return (
        <>
        </>
    );
}


export default App