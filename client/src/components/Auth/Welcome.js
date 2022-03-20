import React from 'react';
import { useDispatch } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom'
import { activate } from '../../redux/actions/auth'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton, Select, MenuItem} from '@material-ui/core'
import useStyles from './styles'

const Welcome = () => {
    const classes = useStyles()
    const { token } = useParams()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const handleEnter = () => {
        dispatch(activate(token , nav))
    }
    return (  <>
                    <section className="page-section">
                        <Container component='main' maxWidth='xs'>
                            <Paper className={classes.paper} elevation={3}>
                            <div>welcome to E tapon mo, <button onClick={handleEnter}>enter</button></div>
                            </Paper>
                        </Container>
                    </section>
                </>
            );
};

export default Welcome;
