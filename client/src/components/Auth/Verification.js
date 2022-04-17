import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, CircularProgress } from '@material-ui/core'

import { verify } from '../../redux/actions/auth'

import verifiedImg from './verified.gif'

const Verification = () => {
    const { id, token } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const {verification} = useSelector((state) => state.auth)
    const [verified, setVerified] = useState(false)

    useEffect(()=> {
        dispatch(verify(id, token))
    }, [location])

    const goToAuth = () => {
        nav('/auth')
    }

    return (
        <div>
            <section className="page-section">
                <Container component='main'>
                    <div className='mt-5'>
                        <center>
                            {verification? 
                            <>
                                <h1>Email Verified!</h1>
                                    <br/>
                                
                                <img className='center' src={verifiedImg} alt='verified' style={{width: "12vw",display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                <br/>
                                <p>you can now log in to our mobile app and web website!</p>
                                <Button variant="contained" color="primary" onClick={goToAuth}>Proceed</Button>
                            </>:
                            <>
                                <h1>Verifying</h1>
                                <br/>
                                <CircularProgress/>
                            </>}
                        </center>
                    </div>
                    
                    {/* {verified? <>
                        
                    </>: null} */}
                </Container>
            </section>
        </div>
    )
}

export default Verification