import React, {useEffect, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Container, Typography, Button, Divider } from '@material-ui/core'
import useStyles from './styles'

import BioPerStreet from './Biodegradable/content/BioPerStreet'
import NonBioPerStreet from './NonBiodegradable/content/NonBioPerStreet'
import RecyclablePerStreet from './Recyclable/content/RecyclablePerStreet'
import CollectedWasteType from './Total/content/CollectedWasteType'
import BioRecord from './Biodegradable/content/BioRecord'
import NonBioRecord from './NonBiodegradable/content/NonBioRecord'
import RecyclableRecord from './Recyclable/content/RecyclableRecord'
import CollectedRecord from './Total/content/CollectedRecord'
import CollectedTimeFrame from './Total/content/CollectedTimeFrame'
import BiodegradableTimeFrame from './Biodegradable/content/BiodegradableTimeFrame'
import NonBiodegradableTimeFrame from './NonBiodegradable/content/NonBiodegradableTimeFrame'
import RecyclableTimeFrame from './Recyclable/content/RecyclableTimeFrame'
import Comparative from './Comparative'

import { getBiodegradableSorted, getNonBiodegradableSorted, getRecyclableSorted, getCollectedSorted } from '../../redux/actions/collection'

const Analytics = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { bioSorted, nonBioSorted, recyclableSorted, collectedSorted } = useSelector((state) => state.collection)

    useEffect(()=>{

        const interval = setInterval(() => {
            dispatch(getCollectedSorted())
            dispatch(getBiodegradableSorted())
            dispatch(getNonBiodegradableSorted())
            dispatch(getRecyclableSorted())
          }, 1000);
          return () => clearInterval(interval);
    })

    const [byBioVariant, setBioVariant] = useState('outlined')
    const [byNonBioVariant, setNonBioVariant] = useState('text')
    const [byRecyclableVariant, setRecyclableVariant] = useState('text')
    const [byCollectionVariant, setByCollectionVariant] = useState('text')

    const handleByBiodegradable = () => {
        setBioVariant("outlined")
        setNonBioVariant("text")
        setRecyclableVariant("text")
        setByCollectionVariant("text")
    }
    const handleByNonBiodegradable = () => {
        setBioVariant("text")
        setNonBioVariant("outlined")
        setRecyclableVariant("text")
        setByCollectionVariant("text")
    }
    const handleByRecyclable = () => {
        setBioVariant("text")
        setNonBioVariant("text")
        setRecyclableVariant("outlined")
        setByCollectionVariant("text")
    }
    const handleByCollection = () => {
        setBioVariant("text")
        setNonBioVariant("text")
        setRecyclableVariant("text")
        setByCollectionVariant("outlined")
    }

    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h4'>Analytics</Typography>
                    </AppBar>

                    <Button color="primary" variant={byBioVariant} onClick={handleByBiodegradable}>Biodegradable</Button>
                    <Button color="primary" variant={byNonBioVariant} onClick={handleByNonBiodegradable}>non-Biodegradable</Button>
                    <Button color="primary" variant={byRecyclableVariant} onClick={handleByRecyclable}>Recyclable</Button>
                    <Button color="primary" variant={byCollectionVariant} onClick={handleByCollection}>All Collection</Button>
                    
                    <div style={{paddingTop: "30px"}}>

                        {byBioVariant == "outlined"? <>
                                <BioPerStreet/>
                                <Divider style={{ margin: '10px 0' }} />
                                <BioRecord bioSorted={bioSorted}/>
                                <Divider style={{ margin: '10px 0' }} />
                                <BiodegradableTimeFrame/>
                        </>:null}

                        {byNonBioVariant == "outlined"? <>
                            <NonBioPerStreet/>
                            <Divider style={{ margin: '10px 0' }} />
                            <NonBioRecord nonBioSorted={nonBioSorted}/>
                            <Divider style={{ margin: '10px 0' }} />
                            <NonBiodegradableTimeFrame/>
                        </>:null}
                        {byRecyclableVariant == "outlined"? <>
                            <RecyclablePerStreet/>
                            <Divider style={{ margin: '10px 0' }} />
                            <RecyclableRecord recyclableSorted={recyclableSorted}/>
                            <Divider style={{ margin: '10px 0' }} />
                            <RecyclableTimeFrame/>
                        </>:null}
                        {byCollectionVariant == "outlined"? <>
                            <CollectedWasteType/>
                            <Divider style={{ margin: '10px 0' }} />
                            <CollectedRecord collectedSorted={collectedSorted}/>
                            <Divider style={{ margin: '10px 0' }} />
                            <CollectedTimeFrame/>
                            {/* <Divider style={{ margin: '10px 0' }} />
                            <Comparative/> */}
                        </>:null}
                    </div>
                    
                    
                </Container>
            </section>
        </div>
    )
}

export default Analytics