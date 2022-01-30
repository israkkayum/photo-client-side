import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
    return (
        <div>
            <Typography component="div">
                <Box sx={{ fontWeight: 'bold', m: 1, textAlign:'center' }}>Develop with <FavoriteIcon sx={{color:'red'}}/> by Israk Kayum</Box>
            </Typography>

        </div>
    );
};

export default Footer;