import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Paper, Typography, CircularProgress, Button, Divider, Select, MenuItem, Box, Container, Modal, TextField} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit.js'
import CheckIcon from '@material-ui/icons/Check.js'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { updateImage, updateCredentials, changePassword } from '../../redux/actions/auth';
import {Streets} from './Streets'

const Account = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { barangays } = useSelector((state) => state.barangay)
    const [streetSelect, setStreetSelect] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [userData, setUserData] = useState({_id: '', name: '', barangay: '', email: '', image: ''})
    const [password, setPassword] = useState({_id: '', oldPassword: '', newPassword: '', confirmNewPassword: ''})

    useEffect(()=> {
        setUserData(user.result)
        setPassword({...password, _id: user.result._id})
    }, [user])
    
    const handleImageSubmit = async (base64) => {
        // console.log(base64)
        const result = await resizeImage(base64)
        setUserData({ ...userData, image: result})
    }

    const resizeImage = (base64Str, maxWidth = 150, maxHeight = 150) => {
        return new Promise((resolve) => {
          let img = new Image()
          img.src = base64Str
          img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height
      
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
          }
        })
      }

    const handleFinalizeImage = () => {
        console.log(userData)
        dispatch(updateImage(userData))
    }

    const handleCredentials = () => {
        dispatch(updateCredentials(userData))
        handleClose()
    }
    
    const handlePassword = () => {
        console.log(password)
        dispatch(changePassword(password))
        handleClose2()
    }

    const handleChangeSelect = (event) => {
        setStreetSelect(event.target.value)
        setUserData({...userData, [event.target.name]: event.target.value})
    };

    return (
        <div className='container'>
         <section className="page-section">
            <Container maxWidth='xl' className='mt-5'>
                <Paper style={{ padding: '20px', borderRadius: '15px', marginTop:'15px' }} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <Typography variant="h3" component="h2">{userData.name}</Typography>
                            <Divider style={{ margin: '20px 0' }} />
                            <Typography gutterBottom variant="body1" component="p"><strong>{userData.email}</strong></Typography>
                            <Typography gutterBottom variant="body1" component="p">{userData.role} of: <strong>{userData.street}</strong></Typography>
                            
                        </div>
                        <div className={classes.imageSection}>
                                <img className={classes.media} src={userData.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLqfekg_kitC_QJ5kgBUTh2tt5EIcxEnQDQ&usqp=CAU"} alt='alt' />
                                
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={ ({base64}) => handleImageSubmit(base64)  }
                                    
                                />
                                
                        </div>
                        <Button variant='contained' color='primary' onClick={handleFinalizeImage}>{<CheckIcon/>}</Button>
                    </div>
                        <Button className='mt-2' variant='contained' color='primary' onClick={handleOpen} startIcon={<EditIcon/>}>Credentials</Button>
                        <Button className='mt-2' variant='contained' color='secondary' onClick={handleOpen2} startIcon={<EditIcon/>}>password</Button>
                </Paper>
            </Container>
        </section>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Credentials
            </Typography>
            <Divider className='mb-2' style={{ margin: '20px 0' }} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField name='name' required variant='filled' label='User name' fullWidth value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value})}/>
                <Typography variant="body1" component="p">Select Street:</Typography>
                        <Select
                                name='street'
                                required
                                label='Street'
                                value={streetSelect}
                                onChange={handleChangeSelect}
                                variant='filled'
                                fullWidth
                            >
                            {Streets.map((street) => (
                                <MenuItem key={street.street} value={street.street}>{street.street}</MenuItem>
                            ))}
                        </Select>
                <Button className='mt-1' type="submit" size='small' variant='contained' color='primary' onClick={handleCredentials} startIcon={<EditIcon />}>Update</Button>
            </Typography>
            </Box>
        </Modal>

        <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Change Password
            </Typography>
            <Divider className='mb-2' style={{ margin: '20px 0' }} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField name='oldPassword' required variant='filled' label='Old password' fullWidth onChange={(e) => setPassword({ ...password, oldPassword: e.target.value})}/>
                <TextField name='newPassword' required variant='filled' label='New password' fullWidth onChange={(e) => setPassword({ ...password, newPassword: e.target.value})}/>
                <TextField name='confirmNewPassword' required variant='filled' label='Confirm new password' fullWidth onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value})}/>
                <Button className='mt-1' type="submit" size='small' variant='contained' color='primary' onClick={handlePassword} startIcon={<EditIcon />}>Update</Button>
            </Typography>
            </Box>
        </Modal>
        </div>
    );
};

export default Account;
