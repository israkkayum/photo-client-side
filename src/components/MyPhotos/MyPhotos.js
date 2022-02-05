import * as React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import MyPhoto from '../MyPhoto/MyPhoto';
import Container from 'react-bootstrap/Container'
import useAuth from '../../hooks/useAuth';

const MyPhotos = () => {

    const [itemData, setItemData] = React.useState([]);
    const [load, setLoad] = React.useState(true);

    const {user} = useAuth();

    React.useEffect(() => {
        fetch(`https://photo-album-server.herokuapp.com/image/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setItemData(data)
                if (data) {
                    setLoad(false);
                }
            })
    }, [])

    const handleRemovePhoto = id => {

        const proceed = window.confirm('Are you sure, you want to delete');

        if (proceed) {

            fetch(`https://photo-album-server.herokuapp.com/image/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingPhotos = itemData.filter(item => item._id != id);
                        setItemData(remainingPhotos);
                    }
                })

        }
    };

    const handlePublicStatus = id => {

        const status = {status: 'public'};

        const proceed = window.confirm('Are you sure, you want to public this pic? If you do it, everyone will see your pic');

        if (proceed) {

            fetch(`https://photo-album-server.herokuapp.com/image/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(status)
            })
                .then(res => res.json())
                .then(data => {
                    window.location.reload();
                })

        }
    };

    const handlePrivateStatus = id => {

        const status = {status: 'private'};

        const proceed = window.confirm('Are you sure, you want to private this pic? If you do it, anyone will not see your pic');

        if (proceed) {

            fetch(`https://photo-album-server.herokuapp.com/image/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(status)
            })
                .then(res => res.json())
                .then(data => {
                    window.location.reload();
                })

        }
    };

    return (
        <div className='py-5'>
            <Container fluid>
                {
                    load ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner animation="border" />
                    </div> :
                        <Row xs={1} sm={1} md={2} lg={3} className="g-3">
                            {
                                itemData.map(item => <MyPhoto

                                    key={item._id}
                                    item={item}
                                    handleRemovePhoto={handleRemovePhoto}
                                    handlePublicStatus={handlePublicStatus}
                                    handlePrivateStatus={handlePrivateStatus}
                                >

                                </MyPhoto>)
                            }
                        </Row>
                }
            </Container>

        </div>
    )
}

export default MyPhotos;
