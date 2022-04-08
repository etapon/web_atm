import React from 'react'

import useStyles from './styles'
import { Typography, Paper, Divider } from '@material-ui/core'
import {Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

const CollectionStreet = ({totalCollected}) => {
    const classes = useStyles()

    var chartLabels = []
    var chartData = []

    totalCollected.forEach(populateLabel)

    function populateLabel(item){
      chartLabels.push(item._id)
    }

    totalCollected.forEach(populateData)

    function populateData(item){
      chartData.push(item.totalWeight)
    }

    const data = {

        labels: chartLabels,

        datasets: [{
          label: "measurement is by Kilo",
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
            <Paper style={{ padding: '5px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card} >
                    <div className={classes.section}>
                        <center>
                          
                            <Typography variant="h6" component="h6">Collected Today (per street)</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                            <div style={{width: '65vw'}}>
                              <Bar data={data}
                                options={{
                                  maintainAspectRatio: false,
                                  indexAxis: 'y' 
                                }}
                                height={600}
                                width={600}
                              />
                            </div>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default CollectionStreet