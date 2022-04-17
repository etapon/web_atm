import React, {useEffect,useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import useStyles from './styles'
import { Typography, Paper, Divider, Button} from '@material-ui/core'
import MaterialTable from 'material-table'

import {getRecyclableSorted} from '../../../redux/actions/collection'

const RecyclableSortedReport = () => {
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()

    const { recyclableSorted } = useSelector((state) => state.collection);
  
    const [data, setData] = useState()

    useEffect(()=>{
        dispatch(getRecyclableSorted());
    }, [location])

    useEffect(() => {
        if(recyclableSorted != null){
            setData(recyclableSorted)
        }
    }, [recyclableSorted]);

    
    
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
        
    

    return (
        <div>
            <Paper style={{ padding: '10px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <center>
                            <Typography variant="h6" component="h6">Recyclables All Time</Typography>
                            <Divider style={{ margin: '5px 0' }} />
                        </center>

                        <Divider style={{ margin: '10px 0' }} />
                        <MaterialTable title="Recyclables All Time"
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

export default RecyclableSortedReport