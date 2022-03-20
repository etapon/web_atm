import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signin, signup } from '../../redux/actions/auth'

import {Streets} from './Streets'

//styles
import {Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton, Select, MenuItem} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'


const initialState = { firstName: '', lastName: '', email:'', barangay: '', password:'', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [barangaySelect, setBarangaySelect] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    
    const handleShowPassword =()=> setShowPassword((prevShowPassword)=> !prevShowPassword);

    const switchMode =()=> {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleChangeSelect = (event) => {
        setBarangaySelect(event.target.value)
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, nav))
        } else {
            dispatch(signin(formData, nav))
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    return (
        <div>
             <section className="page-section">
                <Container component='main' maxWidth='xs'>
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                        <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            <Grid container>
                                {
                                    isSignup && (
                                        <>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    <TextField name='firstName' onChange={handleChange} variant='filled' required autoFocus label='First Name'/>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    <TextField name='lastName' onChange={handleChange} variant='filled' required label='Last Name'/>
                                                </Grid>
                                            </Grid>
                                            <div className={classes.barangay}>
                                                <Typography variant="body1" component="p">Select your street:</Typography>
                                                <Select
                                                        name='street'
                                                        required
                                                        label='Barangay'
                                                        value={barangaySelect}
                                                        onChange={handleChangeSelect}
                                                        variant='filled'
                                                        fullWidth
                                                    >
                                                    {Streets.map((street) => (
                                                        <MenuItem key={street.street} value={street.street}>{street.street}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </>
                                    )
                                }
                                <TextField name='email' onChange={handleChange} variant='filled' required label='Email Address' type='email' fullWidth
                                />
                                <TextField name='password' onChange={handleChange} variant='filled' required label='Password' type={showPassword ? 'text' : 'password'} fullWidth
                                    InputProps = {{
                                        endAdornment:(
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleShowPassword}>
                                                    {!showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {isSignup && <TextField name='confirmPassword' onChange={handleChange} variant='filled' required label='Repeat Password' type='password' fullWidth
                                    />}

                            </Grid>
                            
                            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                            
                            <Grid container justifyContent='flex-end'>
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        { isSignup? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </section>
        </div>
    )
}

export default Auth
