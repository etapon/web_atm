import React from 'react';
import {Paper, Typography, CircularProgress, Button, Divider, Modal, Select, MenuItem, Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './cardStyle'

const BarangayCard = ({name, zone, district}) => {
    const classes = useStyles();
  return (
    <>
        <Paper style={{ padding: '20px', borderRadius: '15px', marginTop:'15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{name}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography gutterBottom variant="body1" component="p">District: {zone}</Typography>
                    <Typography gutterBottom variant="body1" component="p">Zone: {district}</Typography>
                    
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={"https://www.cnn.ph/.imaging/mte/demo-cnn-new/750x450/dam/cnn/2021/2/4/Pasay-City-Logo_CNNPH.jpg/jcr:content/Pasay-City-Logo_CNNPH.jpg"} alt='alt' />
                </div>
                
            </div>
                <center>
                    <Button className='mt-2' variant='contained' color='primary'startIcon={<SearchIcon />} >Analytics</Button>
                </center>
        </Paper>
    </>
  );
};

export default BarangayCard;
