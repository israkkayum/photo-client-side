import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import useAuth from '../../hooks/useAuth';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PublicPhoto = ({photo}) => {


    const {image, email, date, status} = photo;

    const [expanded, setExpanded] = React.useState(false);
    const [avatar, setAvatar] = React.useState({});
    const [love, setLove] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    React.useEffect(() => {
        fetch(`https://photo-album-server.herokuapp.com/users/${email}`)
            .then(res => res.json())
            .then(data => {
                setAvatar(data);
            })
    }, [email]);

    return (
      status=='public' && <div>
      <Card sx={{ width:'100%', marginBottom:'10px'}}>
      <CardHeader
        avatar={
            <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="" src={`data:image/png;base64,${avatar?.avatar}`} />
            </StyledBadge>
          </Stack>
        }

        title={avatar?.displayName}
        subheader={date}
        className='py-3'
      />
      <CardMedia
        component="img"
        height="auto"
        image= {`data:image/png;base64,${image}`}
        alt="Paella dish"
      />
 
      <CardActions disableSpacing className='py-2'>
        <IconButton aria-label="add to favorites">
           
          {
              love?<FavoriteIcon sx={{color:'red'}}  onClick={e => setLove(false)}/>:
              <FavoriteIcon  onClick={e => setLove(true)}/>
          }

        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
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
    </Card>
        </div>
    );
};

export default PublicPhoto;