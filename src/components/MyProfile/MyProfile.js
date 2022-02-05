import React, { useState } from 'react';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import { Badge, Card, Col, FormControl, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import avatarImage from '../../images/avatar.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const MyProfile = (props) => {

    const {disabled, setDisabled, profile, avatar, success, load} = props;

    const {user, emailVerification} = useAuth();

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState(false);      

    const handleEmailVerification = e => {
        emailVerification();
        setMessage(true);
        e.preventDefault();
    };

    return (
        <div>
            {message && <Alert variant="filled" severity="info" className='mb-3'>An email has been sent to your given address. Please click the link in the mail to continue. After click the link please reload this page.</Alert>}

            <Row>
                <Col xs={12} md={4}>
                    <div className="mb-5">

                        <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            
                                {
                                    profile?.avatar ?
                                        <Card.Img variant="top" src={`data:image/png;base64,${profile.avatar}`} /> :
                                        <Card.Img variant="top" src={avatarImage} />
                                }
                            
                        </div>
                        <Stack direction="row" justifyContent='center' alignItems="center" spacing={2}>
                            {avatar && success == 'no' ?
                                <Button onClick={props.handleUpload} variant="contained" component="span">
                                    {load ?
                                        <Spinner animation="grow" /> : <span>
                                            Save
                                        </span>
                                    }
                                </Button> :
                                <label>
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        onChange={e => props.handleSetAvatar(e.target.files[0])}
                                    />
                                    <Button variant="contained" component="span">
                                        Upload Avatar
                                    </Button>
                                </label>
                            }
                        </Stack>
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    <div className='ms-3'>
                        <p className="text-muted">Full Name</p>
                        <p className="fw-bold">{user.displayName}</p>

                        <p className="text-muted">Email Address</p>
                        <p className="fw-bold">{user.email}

                            {user.emailVerified ?
                                <VerifiedIcon className='ms-3' fontSize="small" color="primary" /> :

                                <Badge style={{ cursor: 'pointer' }} onClick={handleEmailVerification} bg="primary" className='ms-3'>Verify</Badge>
                            }

                        </p>

                        <p className="text-muted">Secrete Code</p>
                        <p className="fw-bold">+880 0000000000</p>
                    </div>
                </Col>
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>

                <Button onClick={() => setModalShow(true)} variant="contained" color="error">
                    Delete Account
                </Button>

                <Modal
                    size="md"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"

                >

                    <Modal.Body>
                        <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                <p>Are you sure, you want to delete your account. If you do it, your images and all information will be delete ! </p>
                                For confirm please type this <strong>'DELETE'</strong> word.
                            </Alert>
                        </div> <hr />

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Type 'DELETE'"
                                onChange={e => {
                                    if (e.target.value == 'DELETE') {
                                        setDisabled(false)
                                    }
                                    else {
                                        setDisabled(true)
                                    }

                                }}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                disabled={disabled}
                                onClick={e => props.handleDeleteUser(profile._id)}
                                variant="contained">Confirm</Button>
                        </InputGroup>
                    </Modal.Body>

                </Modal>

            </div>
        </div>
    );
};

export default MyProfile;