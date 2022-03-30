import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    maxWidth: '50px',
    maxHeight: '50px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  imgForCarousel: {
    width: 'auto',
    height: 'auto',
    maxHeight: '500px',
    maxWidth: '1000px'
  },
  [theme.breakpoints.down("sm")]: {
    imgForCarousel: {
      width: 'auto',
      height: 'auto',
      maxHeight: '200px',
      maxWidth: '300px'
    }
  },
  commentsOuterContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding: '10px'
  },
  commentsInnerContainer: { 
    height: '200px', 
    overflowY: 'auto', 
    marginRight: '30px'
  },
  cardAction: {
    width: '100%',
    display: 'block',
    textAlign: 'initial',
  }
}));