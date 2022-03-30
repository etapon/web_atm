import React, {useEffect,useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, Stack, Button} from '@material-ui/core'

import {Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'


const CollectedRecord = ({collectedSorted}) => {
    const classes = useStyles()

    var chartLabels = []
    var chartData = [] 

    if(collectedSorted != null){
        collectedSorted.forEach(populateLabel)

        function populateLabel(item){
        chartLabels.push(item._id)
        }

        collectedSorted.forEach(populateData)

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

    return (
        <div>
            <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Collection Records</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                        </center>
                        
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

export default CollectedRecord