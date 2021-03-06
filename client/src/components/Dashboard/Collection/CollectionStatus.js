import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import { Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import noCollection from './no_collection.png'
import collection from './collection.png'
import { db } from '../../../utils/firebase';
import {ref, onValue} from 'firebase/database';

const CollectionStatus = () => {
    const classes = useStyles()
    const nav = useNavigate()

    const [ binPercentage, setBinPercentage ] = useState();
    const [ binCurrentWeight, setBinCurrentWeight ] = useState();
    const [ active, setActive ] = useState(false)
    const [ wasteType, setWasteType ] = useState()
    const [ street, setStreet ] = useState()

    useEffect(()=>{
        onValue(ref(db), snapshot => {
            const binPercent = snapshot.child('TrashBin').val()
            if(binPercent !== null){
                const converted = parseInt(binPercent)
                setBinPercentage(converted)
            }

            const binWeight = snapshot.child('Weight').val()
            if(binWeight !== null){
                const  converted = parseInt(binWeight)
                setBinCurrentWeight(converted)
            }


            const activeStatus = snapshot.child('activeStatus').val()
            if(activeStatus === 'active'){
                setActive(true)
            }else{
                setActive(false)
            }

            const type = snapshot.child('wasteType').val()
            if(type !== null){
                setWasteType(type)
            }

            const street = snapshot.child('streetAssigned').val()
            if(street !== null){
                setStreet(street)
            }
        })

        
    },[])

    const goToCollections = () => {
        nav('/trashbin')
    }

    return (
        <div>
            <ButtonBase className={classes.cardAction} onClick={goToCollections}>
                <Paper style={{ padding: '5px', borderRadius: '15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <center>
                                <Typography variant="h6" component="h6">Collection Status</Typography>
                                <Divider style={{ margin: '5px 0' }} />
                                {active? <>
                                        <img src={collection} className={classes.media} alt='no_collection'/>
                                        <Typography variant="h6">Currently collecting on: <strong>{street}</strong></Typography>
                                        <Typography variant="h6">Waste Type: <strong>{wasteType}</strong></Typography>
                                        <Typography variant="h6">Current Load: <strong>{binCurrentWeight}</strong> kg</Typography>
                                   
                                </> :
                                    <>
                                        <img src={noCollection} className={classes.media} alt='no_collection'/>
                                        <Typography variant="p"> <strong>No Active Collector</strong> </Typography>
                                    </>
                                }
                            </center>
                        </div>
                    </div>
                </Paper>
            </ButtonBase>
        </div>
    )
}

export default CollectionStatus