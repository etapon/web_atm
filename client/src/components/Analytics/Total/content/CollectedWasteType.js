import React, {useEffect,useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, Stack, Button} from '@material-ui/core'

import {Chart as ChartJS } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

import { getCollectedWasteType } from '../../../../redux/actions/collection'

const RecyclablePerStreet = () => {
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()

    const { collectedWasteType } = useSelector((state) => state.collection);
    
    const [filter, setFilter] = useState({filter:  "all_time"})
    const [byMonthVariant, setByMonthVariant] = useState('text')
    const [byYearVariant, setByYearVariant] = useState('text')
    const [byAllTimeVariant, setByAllTimeVariant] = useState('outlined')
    const [checkedData, setCheckedData] = useState()

    const handleByMonth = () => {
        setByMonthVariant("outlined")
        setByYearVariant("text")
        setByAllTimeVariant("text")
        setFilter({filter:  "month"})
    }
    const handleByYear = () => {
        setByMonthVariant("text")
        setByYearVariant("outlined")
        setByAllTimeVariant("text")
        setFilter({filter:  "year"})
    }
    const handleByAllTime = () => {
        setByMonthVariant("text")
        setByYearVariant("text")
        setByAllTimeVariant("outlined")
        setFilter({filter:  "all_time"})
    }


    useEffect(()=> {
        dispatch(getCollectedWasteType(filter))
    },[location])

    var chartLabels = []
    var chartData = []

    useEffect(()=> {
        dispatch(getCollectedWasteType(filter))
    }, [filter])

    if(collectedWasteType != null){
        collectedWasteType.forEach(populateLabel)

        function populateLabel(item){
        chartLabels.push(item._id)
        }

        collectedWasteType.forEach(populateData)

        function populateData(item){
        chartData.push(item.totalWeight)
        }
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
            <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Collected Waste Type</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                        </center>

                        <Button color="primary" variant={byMonthVariant} onClick={handleByMonth}>By Month</Button>
                        <Button color="primary" variant={byYearVariant} onClick={handleByYear}>By Year</Button>
                        <Button color="primary" variant={byAllTimeVariant} onClick={handleByAllTime}>All Time</Button>
                        
                        <center>
                        <div style={{width: '90vw'}}>
                              <Pie data={data} 
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

export default RecyclablePerStreet