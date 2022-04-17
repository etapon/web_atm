import React from 'react'
import { Container } from '@material-ui/core'


import emailSent from './emailSent.gif'

const GoToEmail = () => {

    return (
        <div>
            <section className="page-section">
                <Container component='main'>
                    <div className='mt-5'>
                        <center>
                                <h1>Verification has been sent!</h1>
                                    <br/>
                                    
                                <img className='center' src={emailSent} alt='verified' style={{width: "12vw",display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                                <br/>
                                <p>you can now check your email and verify your account! <a href='https://mail.google.com'>redirect to google mail</a></p>
                        </center>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default GoToEmail