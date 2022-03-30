import React, {useEffect, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Container, Typography, Button } from '@material-ui/core'
import useStyles from './styles'

import BioPerStreet from './Biodegradable/content/BioPerStreet'
import NonBioPerStreet from './NonBiodegradable/content/NonBioPerStreet'
import RecyclablePerStreet from './Recyclable/content/RecyclablePerStreet'
import CollectedWasteType from './Total/content/CollectedWasteType'
import BioRecord from './Biodegradable/content/BioRecord'
import NonBioRecord from './NonBiodegradable/content/NonBioRecord'
import RecyclableRecord from './Recyclable/content/RecyclableRecord'
import CollectedRecord from './Total/content/CollectedRecord'

import { getBiodegradableSorted, getNonBiodegradableSorted, getRecyclableSorted, getCollectedSorted } from '../../redux/actions/collection'

const Analytics = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { bioSorted, nonBioSorted, recyclableSorted, collectedSorted } = useSelector((state) => state.collection)

    useEffect(()=>{

        const interval = setInterval(() => {
            dispatch(getBiodegradableSorted())
            dispatch(getNonBiodegradableSorted())
            dispatch(getRecyclableSorted())
            dispatch(getCollectedSorted())
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
                    
                    <div style={{paddingTop: "15px"}}>

                        {byBioVariant == "outlined"? <>
                            <BioPerStreet/>
                            <BioRecord bioSorted={bioSorted}/>
                        </>:null}

                        {byNonBioVariant == "outlined"? <>
                            <NonBioPerStreet/>
                            <NonBioRecord nonBioSorted={nonBioSorted}/>
                        </>:null}
                        {byRecyclableVariant == "outlined"? <>
                            <RecyclablePerStreet/>
                            <RecyclableRecord recyclableSorted={recyclableSorted}/>
                        </>:null}
                        {byCollectionVariant == "outlined"? <>
                            <CollectedWasteType/>
                            <CollectedRecord collectedSorted={collectedSorted}/>
                        </>:null}
                    </div>
                    
                    
                </Container>
            </section>
        </div>
    )
}

export default Analytics