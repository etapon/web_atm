import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'
import { getUsers, deleteUser } from '../../redux/actions/auth'
import MaterialTable from 'material-table'

import { updateUser } from '../../redux/actions/auth'

const Users = () => {
    const { allUsers } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const [ data, setData ] = useState()

    useEffect(() => {
      setData(allUsers)
    }, [allUsers]);
    

    const columns = [
      {
        title: 'Name',
        field: 'name',
      },
      {
        title: 'Email',
        field: 'email',
      },
      { title: 'Street',
        field: 'street'
      },
      {
        title: 'Role',
        field: 'role',
      },
      
    ]

  return (
      <div>
            <section className="page-section">
              <Container maxWidth='xl' className='mt-5'>
                  {/* <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} fullPagination/> */}
                  <MaterialTable title="Users"
                  data={data}
                  columns={columns}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          console.log(dataUpdate[index])
                          dispatch(updateUser(dataUpdate[index]))
                          console.log(dataUpdate)
                          setData(dataUpdate);
            
                          resolve();
                        }, 1000)
                      }),
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...data];
                          const index = oldData.tableData.id;
                          console.log(dataDelete[index])
                          dispatch(deleteUser(dataDelete[index]))
                          dataDelete.splice(index, 1);
                          setData(dataDelete);
                          
                          resolve()
                        }, 1000)
                      }),
                  }}
                  />
              </Container>
          </section>
      </div>
  )
}

export default Users
