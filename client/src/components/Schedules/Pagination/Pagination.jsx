import React, {useEffect} from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getSchedules } from '../../../redux/actions/schedule'

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { numberOfPages } = useSelector((state)=> state.schedule);

    useEffect(()=> {
        if(page) dispatch(getSchedules(page))
    },[page]);

    return (
        <Pagination
            classes = {{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='primary'
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/schedules?page=${item.page}`}/>
            )}
        />
    )
}

export default Paginate;