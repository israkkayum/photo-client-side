import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});


const Header = () => {

    const [image, setImage] = React.useState(null);
    const [success, setSuccess] = React.useState('no');

    const handleUpload =  e => {
      
      if(image){
      const formData = new FormData();
      formData.append('image', image);

      fetch('https://photo-album-server.herokuapp.com/image', {
          method: 'POST',
          body: formData,
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
             setSuccess('yes');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }

      else{
        setSuccess("no");
      }

    }

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
              Photo
            </Typography>
            
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="contained-button-file">
                <Input 

                accept="image/*" 
                id="contained-button-file" 
                type="file" 
                onChange = {e => setImage(e.target.files[0])}
                />
                  <CloudUploadIcon />
              </label>
                {
                  image && success == 'no'? <Button onClick={handleUpload} variant="contained" component="span">
                  Upload
                </Button> : 
                <Button onClick={handleUpload} variant="contained" disabled component="span">
                Upload
              </Button>
                }
    
            </Stack>
             

            <Button style={{marginLeft: '10px'}} variant="contained">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
};

export default Header;