import React from 'react';
import { Card, Col } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    MaxWidth: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MyPhoto = (props) => {

    const { image, _id, status } = props.item;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>

            <Col>
                <Card>
                    <Card.Img variant="top" src={`data:image/png;base64,${image}`} style={{ height: '300px' }} />
                    <Card.Body>
                        <Card.Title style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                            <Button onClick={() => props.handleRemovePhoto(_id)} variant="contained"><DeleteIcon /></Button>

                            {/* <a
                                href={`data:image/png;base64,${image}`}
                                download
                            >

                                <Button variant="contained"><CloudDownloadIcon /></Button>

                            </a> */}

                            {
                                status=='public'? 
                                <Button onClick={() => props.handlePrivateStatus(_id)} variant="contained"><PublicIcon/></Button>:

                                <Button onClick={() => props.handlePublicStatus(_id)} variant="contained"><PublicOffIcon/></Button>
                            }

                            <Button onClick={handleOpen} variant="contained"><FullscreenIcon /></Button>

                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img src={`data:image/png;base64,${image}`} style={{ height: '100%', width: 'auto' }} />
                </Box>
            </Modal>

        </div>
    );
};

export default MyPhoto;