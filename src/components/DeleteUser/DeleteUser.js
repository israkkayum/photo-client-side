import { Button } from '@mui/material';
import React from 'react';

const DeleteUser = (props) => {

    const {email} = props.profile

    return (
        <div>
            <Button onClick={() => props.handleDeleteUser(email)} variant="contained" color="error">
                Delete Account
            </Button>
        </div>
    );
};

export default DeleteUser;