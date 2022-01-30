import * as React from 'react';
import { Row } from 'react-bootstrap';
import Photo from '../Photo/Photo';
import './Home.css';
import Container from 'react-bootstrap/Container'

const Home = () => {

    const [itemData, setItemData] = React.useState([]);

    React.useEffect( () => {
        fetch('https://photo-album-server.herokuapp.com/image')
        .then(res => res.json())
        .then(data => setItemData(data))
    } ,[])

    const handleRemovePhoto = id =>{

        const proceed = window.confirm('Are you sure, you want to delete');

        if(proceed){
            
            fetch(`https://photo-album-server.herokuapp.com/image/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        const remainingPhotos = itemData.filter(item => item._id != id);
                        setItemData(remainingPhotos);
                    }
                })

        }
    };

    return ( 
        <div className='py-5'>
            <Container fluid>
            <Row xs={1} sm={1} md={3} lg={4} className="g-4">
            {
                itemData.map(item => <Photo
                
                    key = {item._id}
                    item = {item}
                    handleRemovePhoto = {handleRemovePhoto }
                >

                </Photo>)
            }
            </Row>
            </Container>
        </div>
    )
}

export default Home;
