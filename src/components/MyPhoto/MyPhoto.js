import * as React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Photo from '../Photo/Photo';
import Container from 'react-bootstrap/Container'
import useAuth from '../../hooks/useAuth';

const MyPhoto = () => {

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

    return (
        <div className='py-5'>
            <Container fluid>
                {
                    load ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner animation="border" />
                    </div> :
                        <Row xs={1} sm={1} md={2} lg={3} className="g-3">
                            {
                                itemData.map(item => <Photo

                                    key={item._id}
                                    item={item}
                                    handleRemovePhoto={handleRemovePhoto}
                                >

                                </Photo>)
                            }
                        </Row>
                }
            </Container>

        </div>
    )
}

export default MyPhoto;
