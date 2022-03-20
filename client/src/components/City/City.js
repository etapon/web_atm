import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import ReactMapGL, { FullscreenControl, Marker, GeolocateControl, Popup } from 'react-map-gl'

import { CircularProgress, Grid, Paper, AppBar, TextField, Button, Container, Typography} from '@material-ui/core'
import LocationCityIcon from '@material-ui/icons/LocationSearching';
import useStyles from './styles'

import BarangayCard from './BarangayCard';

const City = () => {
    const classes = useStyles()

    const { barangays } = useSelector((state) => state.barangay)
    
    const [cuurrentPlaceId, setCurrentPlaceId] = useState(null)
    const [showPopup, togglePopup] = React.useState(true);
    const [viewport, setViewport] = useState({
        width: FullscreenControl,
        height: 600,
        latitude: 14.5378,
        longitude: 121.0014,
        zoom: 15
      })

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id)
        setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 19 });
    }

    return (
        <div>
            <section className="page-section">
                <Container maxWidth='xl'>
                    <AppBar className={classes.appBar} position='static' color ='inherit'>
                        <Typography variant = 'h3'>City Map</Typography>
                    </AppBar>
                    <ReactMapGL
                        mapStyle='mapbox://styles/dagzue25/ckyll6k1vjm8115nuyctict7l'
                        
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                            
                        {barangays.map((barangay) => (
                            <>
                                <div key={barangay._id} >
                                    <Marker latitude={barangay.lat} longitude={barangay.long}>
                                        <LocationCityIcon style={{fontSize:viewport.zoom+15 , color:'slateblue', cursor:'pointer'}} onClick={()=> handleMarkerClick(barangay._id, barangay.lat, barangay.long)}/>
                                    </Marker>
                                    {cuurrentPlaceId == barangay._id && <Popup
                                    latitude={barangay.lat}
                                    longitude={barangay.long}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => setCurrentPlaceId(null)}
                                    anchor="bottom" >
                                    <div><BarangayCard name={barangay.name} zone={barangay.zone} district={barangay.district}/></div>
                                    </Popup>}
                                </div>
                            </>
                        ))}

                    </ReactMapGL>
                    
                    
                </Container>
            </section>
        </div>
    )
}

export default City
