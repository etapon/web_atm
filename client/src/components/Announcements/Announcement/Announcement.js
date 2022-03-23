import React, { useState } from 'react';

import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {Card, CardActions, CardContent, CardMedia,  Typography, CardHeader, Avatar, IconButton, Collapse} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import red from '@material-ui/core/colors/red'
import {styled} from '@material-ui/styles'
import moment from 'moment'

import { deleteAnnouncement } from '../../../redux/actions/announcement'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto'
}));



const Announcement = ({announcement, setAnnouncementId, isAdmin}) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleEdit = () => {
      setAnnouncementId(announcement._id)
      nav('/announcementsForm')
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


  return (
      <>
        <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={announcement.profile || 'https://i.stack.imgur.com/l60Hf.png'}/>
        }
        action={
          <>
          {isAdmin ? <>
          <IconButton aria-label="settings" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="settings" onClick={()=> dispatch(deleteAnnouncement(announcement._id))}>
            <DeleteIcon />
          </IconButton></>:null}
          
          </>
        }
        title={announcement.creator}
        subheader={moment(announcement.createdAt).fromNow()}
      />
      <CardMedia
        component="img"
        height="194"
        image={announcement.selectedFile}
        alt={announcement.title}
      />
      <CardContent>
        <Typography variant="h5">
          <strong>{announcement.title}</strong>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{announcement.street? <Typography variant='h6' paragraph>To the residents of: {announcement.street}</Typography> : null}
          <Typography paragraph>
            {announcement.message}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
      </>
  );
};

export default Announcement;
