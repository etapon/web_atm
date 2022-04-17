import React, {useEffect,useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, Button} from '@material-ui/core'
import MaterialTable from 'material-table'

import { getBiodegradableDynamic } from '../../../redux/actions/collection'

const BioDynamicReport = () => {
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()

    const { biodegradableDynamic } = useSelector((state) => state.collection);

    const [filter, setFilter] = useState({filter:  "all_time"})
    const [byMonthVariant, setByMonthVariant] = useState('text')
    const [byYearVariant, setByYearVariant] = useState('text')
    const [byAllTimeVariant, setByAllTimeVariant] = useState('outlined')
    const [data, setData] = useState()
    const [title, setTitle] = useState("Biodegradables All Time")

    useEffect(()=>{
        dispatch(getBiodegradableDynamic(filter));
    }, [location])

    useEffect(() => {
        setData(biodegradableDynamic)
      }, [biodegradableDynamic]);

    const handleByMonth = () => {
        setByMonthVariant("outlined")
        setByYearVariant("text")
        setByAllTimeVariant("text")
        setFilter({filter:  "month"})
        setTitle("Biodegradables By Month")
    }
    const handleByYear = () => {
        setByMonthVariant("text")
        setByYearVariant("outlined")
        setByAllTimeVariant("text")
        setFilter({filter:  "year"})
        setTitle("Biodegradables By Year")
    }
    const handleByAllTime = () => {
        setByMonthVariant("text")
        setByYearVariant("text")
        setByAllTimeVariant("outlined")
        setFilter({filter:  "all_time"})
        setTitle("Biodegradables All time")
    }

    useEffect(()=> {
        dispatch(getBiodegradableDynamic(filter))
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
                            <Typography variant="h6" component="h6">Biodegradables per Street</Typography>
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

export default BioDynamicReport