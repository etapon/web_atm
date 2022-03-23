import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
import Welcome from './components/Auth/Welcome'
import Users from './components/Users/Users'
import Account from './components/Users/Account'
import Schedules from './components/Schedules/Schedules'
import ScheduleDetails from './components/Schedules/ScheduleDetails/ScheduleDetails'
import SchedForm from './components/Schedules/Form/SchedForm'
import ScheduleForm from './components/Schedules/Form/ScheduleForm'
import Dashboard from './components/Dashboard/Dashboard'

import Announcements from './components/Announcements/Announcements'
import AnnouncementForm from './components/Announcements/Form/AnnouncementForm'
import { ToastProvider, useToasts, DefaultToast } from 'react-toast-notifications'

import Trashbin from './components/Collection/Trashbin/Trashbin'


const App = () => {
    const [scheduleId, setScheduleId] = useState('')
    const [announcementId, setAnnouncementId] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'));
    const { message, message_type } = useSelector((state) => state.message)
    console.log(message_type)
  

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
                    <Route path='/apppage' element={<AppPage/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                    <Route path='/activate/:token' element={<Welcome/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/account' element={<Account/>}/>

                    <Route path='/schedules' element={<Schedules setScheduleId={setScheduleId} />} />
                    <Route path='/schedule/:id' element={<ScheduleDetails/>}/>
                    <Route path='/schedulesForm' element={<ScheduleForm scheduleId={scheduleId} setScheduleId={setScheduleId}/>}/>
                    <Route path='/schedForm' element={<SchedForm scheduleId={scheduleId} setScheduleId={setScheduleId}/>}/>
                    <Route path='/schedules/search' element={<Schedules/>}/>

                    <Route path='/announcements' element={<Announcements setAnnouncementId={setAnnouncementId} />}/>
                    <Route path='/announcementsForm' element={<AnnouncementForm announcementId={announcementId} setAnnouncementId={setAnnouncementId} />}/>
                    <Route path='/announcements/search' element={<Announcements/>}/>

                    <Route path='/trashbin' element={<Trashbin/>}/>

                    <Route path='/dashboard' element={<Dashboard/>}/>
                </Routes>

                {/* <Footer/> */}
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