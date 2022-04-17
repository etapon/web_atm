import React, {useEffect,useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, Button} from '@material-ui/core'
import MaterialTable from 'material-table'

import { getRecyclableDynamic } from '../../../redux/actions/collection'

const RecyclableDynamicReport = () => {
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()

    const { recyclableDynamic } = useSelector((state) => state.collection);

    const [filter, setFilter] = useState({filter:  "all_time"})
    const [byMonthVariant, setByMonthVariant] = useState('text')
    const [byYearVariant, setByYearVariant] = useState('text')
    const [byAllTimeVariant, setByAllTimeVariant] = useState('outlined')
    const [data, setData] = useState()
    const [title, setTitle] = useState("Recyclables All Time")

    useEffect(()=>{
        dispatch(getRecyclableDynamic(filter));
    }, [location])

    useEffect(() => {
        setData(recyclableDynamic)
      }, [recyclableDynamic]);

    const handleByMonth = () => {
        setByMonthVariant("outlined")
        setByYearVariant("text")
        setByAllTimeVariant("text")
        setFilter({filter:  "month"})
        setTitle("Recyclables By Month")
    }
    const handleByYear = () => {
        setByMonthVariant("text")
        setByYearVariant("outlined")
        setByAllTimeVariant("text")
        setFilter({filter:  "year"})
        setTitle("Recyclables By Year")
    }
    const handleByAllTime = () => {
        setByMonthVariant("text")
        setByYearVariant("text")
        setByAllTimeVariant("outlined")
        setFilter({filter:  "all_time"})
        setTitle("Recyclables All time")
    }

    useEffect(()=> {
        dispatch(getRecyclableDynamic(filter))
    }, [filter])
    
    const columns = [
        {
          title: 'Street Name',
          field: '_id',
        },
        {
          title: 'Waste Collected (kilo)',
          field: 'totalWeight',
        }
      ]
        
    

    return (
        <div>
            <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Recyclables per Street</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                        </center>

                        <Button color="primary" variant={byMonthVariant} onClick={handleByMonth}>By Month</Button>
                        <Button color="primary" variant={byYearVariant} onClick={handleByYear}>By Year</Button>
                        <Button color="primary" variant={byAllTimeVariant} onClick={handleByAllTime}>All Time</Button>
                        <Divider style={{ margin: '10px 0' }} />
                        <MaterialTable title={title}
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

export default RecyclableDynamicReport