import React, {useState} from 'react'

import { AppBar, Container, Typography, Divider, Button } from '@material-ui/core'
import useStyles from './styles'

import BioTodayReport from './Biodegradable/BioTodayReport'
import BioDynamicReport from './Biodegradable/BioDynamicReport'
import BioTimeFrameReport from './Biodegradable/BioTimeFrameReport'
import BioSortedReport from './Biodegradable/BioSortedReport'

import NonBioTodayReport from './NonBiodegradable/NonBioTodayReport'
import NonBioDynamicReport from './NonBiodegradable/NonBioDynamicReport'
import NonBioTimeFrameReport from './NonBiodegradable/NonBioTimeFrameReport'
import NonBioSortedReport from './NonBiodegradable/NonBioSortedReport'

import RecyclableTodayReport from './Recyclable/RecyclableTodayReport'
import RecyclableDynamicReport from './Recyclable/RecyclableDynamicReport'
import RecyclableSortedReport from './Recyclable/RecyclableSortedReport'
import RecyclableTimeFrameReport from './Recyclable/RecyclableTimeFrameReport'

import CollectionTimeFrameReport from './AllCollection/CollectionTimeFrameReport'
import CollectionSortedReport from './AllCollection/CollectionSortedReport'

const Reports = () => {
    const classes = useStyles();

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
                        <Typography variant = 'h4'>Biodegradables</Typography>
                    </AppBar>

                    <Button color="primary" variant={byBioVariant} onClick={handleByBiodegradable}>Biodegradable</Button>
                    <Button color="primary" variant={byNonBioVariant} onClick={handleByNonBiodegradable}>non-Biodegradable</Button>
                    <Button color="primary" variant={byRecyclableVariant} onClick={handleByRecyclable}>Recyclable</Button>
                    <Button color="primary" variant={byCollectionVariant} onClick={handleByCollection}>All Collection</Button>
                    <div style={{paddingTop: "30px"}}>

                        {byBioVariant == "outlined"?
                            <>
                                <BioTodayReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <BioSortedReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <BioDynamicReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <BioTimeFrameReport/>
                                <Divider style={{ margin: '10px 0' }} />
                            </>
                        : null
                        }

                        {byNonBioVariant == "outlined"?
                            <>
                                <NonBioTodayReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <NonBioSortedReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <NonBioDynamicReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <NonBioTimeFrameReport/>
                                <Divider style={{ margin: '10px 0' }} />
                            </>
                        : null}

                        {byRecyclableVariant == "outlined"?
                            <>
                                <RecyclableTodayReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <RecyclableSortedReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <RecyclableDynamicReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <RecyclableTimeFrameReport/>
                                <Divider style={{ margin: '10px 0' }} />
                               
                            </>
                        :null
                        }
                        {byCollectionVariant == "outlined"?
                            <>
                                <CollectionTimeFrameReport/>
                                <Divider style={{ margin: '10px 0' }} />
                                <CollectionSortedReport/>
                                <Divider style={{ margin: '10px 0' }} />
                            </>
                        :null}
                        
                    </div>
                    

                </Container>
            </section>
        </div>
    )
}

export default Reports