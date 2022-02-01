import React, { useState } from 'react';
import { Card, Col, Container, Image, Nav, NavItem, Row, Spinner, Tab } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';
import { Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});


const Profile = () => {

    const { logout, user } = useAuth();

    const [avatar, setAvatar] = useState(null);
    const [success, setSuccess] = React.useState('no');
    const [load, setLoad] = React.useState(false);
    const [profile, setProfile] = useState({});

    const email = user.email;

    const handleUpload = e => {

        if (avatar) {
            setLoad(true);
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('email', email);

            fetch('https://photo-album-server.herokuapp.com/users', {
                method: 'PUT',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                        setSuccess('yes');
                        setLoad(false);
                        window.location.reload();
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

    React.useEffect(() => {
        fetch(`https://photo-album-server.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            })
    }, [])

    return (
        <Container className='my-5 py-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Card className='p-3 shadow' style={{ border: 'none' }}>

                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Image style={{height:'100px', width:'100px'}} roundedCircle src={`data:image/png;base64,${profile.avatar}`} alt="" />
                        </div>

                            <Nav variant="pills" className="flex-column my-2">
                                <Nav.Item className='my-3'>
                                    <Nav.Link eventKey="first">
                                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                                            <div>
                                                <PersonIcon />
                                            </div>
                                            <div style={{ marginLeft: '50px' }}>
                                                My Profile
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={logout}>
                                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                                            <div>
                                                <LogoutIcon />
                                            </div>
                                            <div style={{ marginLeft: '50px' }}>
                                                Logout
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card>
                    </Col>
                    <Col sm={9}>
                        <Card className='p-3 shadow' style={{ border: 'none' }}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <div className="me-5">
                                                
                                            <div className='mb-3' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                <Card.Img variant="top" src={`data:image/png;base64,${profile.avatar}`} />
                                            </div>
                                                <Stack direction="row" justifyContent='center' alignItems="center" spacing={2}>
                                                    {avatar && success == 'no' ?
                                                        <Button onClick={handleUpload} variant="contained" component="span">
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
                                                                onChange={e => setAvatar(e.target.files[0])}
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
                                            <div>
                                                <p className="text-muted">Full Name</p>
                                                <p className="fw-bold">{user.displayName}</p>

                                                <p className="text-muted">Email Address</p>
                                                <p className="fw-bold">{user.email}</p>

                                                <p className="text-muted">Secrete Code</p>
                                                <p className="fw-bold">+880 0000000000</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                            </Tab.Content>
                        </Card>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default Profile;