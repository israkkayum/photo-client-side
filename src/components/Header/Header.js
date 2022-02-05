import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Modal, Spinner } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import UploadIcon from '@mui/icons-material/Upload';
import { Alert, AlertTitle } from '@mui/material';


const Input = styled('input')({
  display: 'none',
});


const Header = () => {

  const { user } = useAuth();

  const [image, setImage] = React.useState(null);
  const [success, setSuccess] = React.useState('no');
  const [load, setLoad] = React.useState(false);
  const [profile, setProfile] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const email = user.email;
  const date = new Date().toDateString();
  const status = 'public';

  const handleUpload = e => {

    if (image) {
      setLoad(true);

      const formData = new FormData();

      formData.append('image', image);
      formData.append('email', email);
      formData.append('date', date);
      formData.append('status', status);

      fetch('https://photo-album-server.herokuapp.com/image', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            setSuccess('yes');
            setLoad(false);
            window.location.reload();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    else {
      setSuccess("no");
      setLoad(false);
    }

  }

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
  }))

  React.useEffect(() => {
    fetch(`https://photo-album-server.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
      })
  }, [user.email]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} end to="/">Photo</NavLink>
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>

            {
              user.email ?

                <Button onClick={() => setModalShow(true)} variant="contained" component="span">
                  <UploadIcon fontSize='small' className='me-2' /> Upload
                </Button> :
                <Button variant="contained" disabled component="span">
                  <UploadIcon fontSize='small' className='me-2' /> Upload
                </Button>
            }
          </Stack>

          <Modal
            size="md"
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
          >
            <Modal.Body>
              <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {user.emailVerified ?

                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={e => setImage(e.target.files[0])}
                    />
                    <CloudUploadOutlinedIcon color='primary' style={{ fontSize: '100px', cursor: 'pointer' }} />
                  </label> :

                  <Alert severity="info">
                    <AlertTitle>Email Unverified !!</AlertTitle>
                    For verification <strong>Click 'Profile Icon' or go to 'My Profile' Option. </strong>
                  </Alert>

                }

              </div>
              <hr />

              {
                image && success == 'no' ?
                  <Button style={{ width: "100%" }} onClick={handleUpload} variant="contained">
                    {load ?
                      <Spinner animation="grow" /> : <span>
                        Post
                      </span>

                    }
                  </Button> :
                  <Button style={{ width: "100%" }} variant="contained" disabled>Post</Button>
              }

            </Modal.Body>
          </Modal>

          {
            user.email ?
              <Stack className='mx-3' direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <NavLink end to='/profile'>

                    <Avatar src={`data:image/png;base64,${profile?.avatar}`} alt='' />

                  </NavLink>

                </StyledBadge>
              </Stack> :
              <NavLink style={{ textDecoration: 'none' }} to="login"><Button style={{ marginLeft: '10px' }} variant="contained">Login</Button></NavLink>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;