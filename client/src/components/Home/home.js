import React from 'react'
import { AppBar, Container, Typography } from '@material-ui/core'
import useStyles from './styles';
// import back from './back.css'
const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h3'>Welcome To E-Tapon Mo!</Typography>
                    </AppBar>

                    <div class="col-md-12 mt-5 text-center">
                        <h1>Collect, Manage</h1>
                        <h3>and Analyze.</h3>
                    </div>
                    
                </Container>
            </section>
        </div>
    )
}

export default Home
