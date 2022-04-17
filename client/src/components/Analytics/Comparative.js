import React, {useEffect,useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import useStyles from './Recyclable/content/styles'
import { Typography, Paper, Divider, Stack, Button} from '@material-ui/core'

import {Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

import { getRecyclableSorted, getBiodegradableSorted, getNonBiodegradableSorted } from '../../redux/actions/collection'

const Comparative = () => {
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(()=> {
      dispatch(getRecyclableSorted())
      dispatch(getBiodegradableSorted())
      dispatch(getNonBiodegradableSorted())
    })

    const { recyclableSorted, biodegradableSorted, nonBiodegradableSorted } = useSelector((state) => state.collection);
    
    const [filter, setFilter] = useState({filter:  "all_time"})
    const [byMonthVariant, setByMonthVariant] = useState('text')
    const [byYearVariant, setByYearVariant] = useState('text')
    const [byAllTimeVariant, setByAllTimeVariant] = useState('outlined')
    const [checkedData, setCheckedData] = useState()


    var chartLabelsRecyclable = []
    var chartDataRecyclable = []

    var chartLabelsBiodegradable = []
    var chartDataBiodegradable = []

    var chartLabelsNonBiodegradable = []
    var chartDataNonBiodegradable = []


    if(recyclableSorted != null){
        recyclableSorted.forEach(populateLabel)

        function populateLabel(item){
            chartLabelsRecyclable.push(item._id)
        }

        recyclableSorted.forEach(populateData)

        function populateData(item){
            chartDataRecyclable.push(item.totalWeight)
        }
    }

    if(biodegradableSorted != null){
      biodegradableSorted.forEach(populateLabel)

      function populateLabel(item){
          chartLabelsBiodegradable.push(item._id)
      }

      biodegradableSorted.forEach(populateData)

      function populateData(item){
          chartDataBiodegradable.push(item.totalWeight)
      }
  }

  // if(nonBiodegradableSorted != null){
  //       nonBiodegradableSorted.forEach(populateLabel)

  //       function populateLabel(item){
  //           chartLabelsNonBiodegradable.push(item._id)
  //       }

  //       nonBiodegradableSorted.forEach(populateData)

  //       function populateData(item){
  //           chartDataNonBiodegradable.push(item.totalWeight)
  //       }
  //   }
    
    
        
    const data = {

        labels: chartLabelsBiodegradable,

        datasets: [{
          label: "Biodegradable",
          data: chartDataBiodegradable,

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
        }, 
        {
          label: "non-Biodegradable",
          data: chartDataNonBiodegradable,

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
                            <Typography variant="h6" component="h6">Comparative Analytics of waste Type</Typography>
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

export default Comparative