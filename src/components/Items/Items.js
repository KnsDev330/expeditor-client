import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';
import { auth } from '../../firebase.init';
import './Items.css';
import { Link } from 'react-router-dom';

const toastConfig = { position: "top-right", autoClose: 2000 };

const Items = ({ home }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [user, loading] = useAuthState(auth);

    const [items, setItems] = useState([]);
    useEffect(() => {
        if (loading) return;
        let data = {
            page,
            limit: home ? 6 : limit
        }
        if (localStorage.getItem('jwt') && user) {
            data.jwt = localStorage.getItem('jwt');
            data.accessToken = user.accessToken;
        }
        console.log(data);
        axios({
            url: `${URLS.serverRoot}${URLS.getItems}`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data
        })
            .then(r => setItems(r.data))
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig));
    }, [user, page, limit, home, loading]);

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <>
                {isReadMore ? text.slice(0, 120) : text}
                <span onClick={toggleReadMore} style={{ color: 'rgb(192,192,192)', cursor: 'pointer' }}>
                    {isReadMore ? "...  read more" : " show less"}
                </span>
            </>
        );
    };

    const animations = ['fromLeft', 'fromTop', 'fromRight', 'fromBottom'];

    return (
        <div className='site-mw mx-auto d-flex flex-column align-items-center'>
            <h2 className='text-center my-4'>Items we manage</h2>
            <div className='items d-flex gap-3 mb-3 flex-wrap justify-content-center'>
                {
                    items.map(({ _id, name, image, description, quantity, price, supplier, sold }, index) => <>

                        <Card style={{ width: '20rem' }} className={`item ` + animations[index % 4]}>
                            <Card.Img variant="top" src={`https://knsdev330-a3.netlify.app/src/images/` + image} />
                            <Card.Body className='d-flex flex-column'>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text className='mb-1'><span className='w-70px'>Price:</span> <span style={{ fontWeight: '500' }}>{Number(price).toLocaleString()} BDT</span></Card.Text>
                                <Card.Text className='mb-1'><span className='w-70px'>Quantity:</span> <span style={{ fontWeight: '500' }}>{Number(quantity).toLocaleString()}</span></Card.Text>
                                <Card.Text className='mb-1'><span className='w-70px'>Supplier:</span> <span style={{ fontWeight: '500' }}>{supplier}</span></Card.Text>
                                <Card.Text className='my-2 description'>
                                    <ReadMore>{description}</ReadMore>
                                </Card.Text>
                                <Button as={Link} to={`/inventory/${_id}`} variant="outline-success" className='mt-auto w-50 mx-auto'>Manage</Button>
                            </Card.Body>
                        </Card>
                    </>)
                }
            </div>
            {
                home && <Button as={Link} to={`/manage-inventories`} className='mb-5 mt-3'> Manage Inventories </Button>
            }
        </div >
    );
};

export default Items;