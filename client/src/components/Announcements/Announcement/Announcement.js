import React, { useState } from 'react';

import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import useStyles from './styles';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Divider, CardHeader, Avatar, IconButton, Collapse} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
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
  marginLeft: 'auto',
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
}));

const Announcement = ({announcement, setAnnouncementId}) => {
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
          <IconButton aria-label="settings" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="settings" onClick={()=> dispatch(deleteAnnouncement(announcement._id))}>
            <DeleteIcon />
          </IconButton>
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
        <Typography variant="body2">
         {announcement.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
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
        <CardContent>
          <Typography variant='h6' paragraph>To the residents of: {announcement.street}</Typography>
          
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
