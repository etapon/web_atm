import React, {useEffect, useState} from 'react'

import useStyles from './styles'
import { Typography, Paper, Divider, TextField, Button} from '@material-ui/core'

import { getNonBiodegradableTimeFrame } from '../../../../redux/actions/collection'
import {Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'


const NonBiodegradableTimeFrame = () => {
    const classes = useStyles()
    const dispatch = useDispatch()


    const { nonBiodegradableTimeFrame } = useSelector((state) => state.collection);
    const [formData, setFormData] = useState({from: '', to: ''})

    var chartLabels = []
    var chartData = []

    if(nonBiodegradableTimeFrame != null){
        nonBiodegradableTimeFrame.forEach(populateLabel)

        function populateLabel(item){
        chartLabels.push(item._id)
        }

        nonBiodegradableTimeFrame.forEach(populateData)

        function populateData(item){
        chartData.push(item.totalWeight)
        }
    }

    const data = {

        labels: chartLabels,

        datasets: [{
          label: "Kilos",
          data: chartData,

          backgroundColor: [
            "#ABDEE6",
            "#CBAACB",
            "#FFFFB5",
            "#FFCCB6",
            "#C6DBDA",
            "#F6EAC2",
            "#FF968A",
            "#8FCACA",
            "#CCE2CB",
            "#B6CFB6",
            "#63B8B3",
            "#97C1A9",
            "#D6BDA4",
            "#B35568"
          ],

          hoverOffset: 4
        }]
        
      };

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
                            <Typography variant="h6" component="h6">non-Biodegradable Filter by Time Frame</Typography>
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
                            
                        
                        

                        <center>
                        <div style={{width: '90vw'}}>
                            <Line data={data} 
                            options={{
                                maintainAspectRatio: false
                            }}
                            height={400}
                            width={900}
                            />
                        </div>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default NonBiodegradableTimeFrame