import React from 'react'

import useStyles from './styles'
import { Typography, Paper, Divider } from '@material-ui/core'
import {Chart as ChartJS } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2';

const Streets = ({userStreets}) => {
    const classes = useStyles()

    var chartLabels = []
    var chartData = []

    userStreets.forEach(populateLabel)

    function populateLabel(item){
      chartLabels.push(item._id)
    }

    userStreets.forEach(populateData)

    function populateData(item){
      chartData.push(item.totalUser)
    }

    const data = {

        labels: chartLabels,

        datasets: [{
          label: 'My First Dataset',

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
                          
                            <Typography variant="h6" component="h6">Resident Users</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                            <div style={{width: '20vw'}}>
                              <Pie data={data} 
                                options={{
                                  maintainAspectRatio: false
                                }}
                                height={450}
                                width={300}
                              />
                            </div>
                        </center>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Streets