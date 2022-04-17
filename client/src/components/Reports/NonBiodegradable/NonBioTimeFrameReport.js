import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { Typography, Paper, Divider, TextField, Button} from '@material-ui/core'
import MaterialTable from 'material-table'

import { getNonBiodegradableTimeFrame } from '../../../redux/actions/collection'

const NonBioTimeFrameReport = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { nonBiodegradableTimeFrame } = useSelector((state) => state.collection);
    const [data, setData] = useState()
    const [formData, setFormData] = useState({from: '', to: ''})

    useEffect(()=>{
        if(nonBiodegradableTimeFrame != null){
            setData(nonBiodegradableTimeFrame)
        }
    }, [nonBiodegradableTimeFrame])
    
    const columns = [
        {
          title: 'Date',
          field: '_id',
        },
        {
          title: 'Waste Collected (kilo)',
          field: 'totalWeight',
        }
      ]

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleFilter = () => {
        dispatch(getNonBiodegradableTimeFrame(formData))
    }

    return (
        <div>
            <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Non-Biodegradable Filter by Time Frame</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                        </center>
                        <div style={{padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <TextField
                                id="date"
                                label="from"
                                name="from"
                                type="date"
                                variant="filled"
                                style={{margin: "5px"}}
                                onChange={handleChange}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <TextField
                                id="date"
                                label="to"
                                name="to"
                                type="date"
                                onChange={handleChange}
                                variant="filled"
                                style={{margin: "5px"}}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <Button style={{margin: "5px"}} variant="contained" color="primary" onClick={handleFilter}>Filter</Button>
                        </div>
                        <Divider style={{ margin: '10px 0' }} />
                        <MaterialTable title="Non-Biodegradable By Time Frame"
                            data={data}
                            columns={columns}
                            options={{
                                exportButton: true
                            }}
                        />
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default NonBioTimeFrameReport