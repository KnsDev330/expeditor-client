import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';
import { auth } from '../../firebase.init';
import ReadMore from '../ReadMore/ReadMore';

import './MyItems.css';
const toastConfig = { position: "top-right", autoClose: 2000 };

const MyItems = () => {

    // current firebase user
    const [user, loading] = useAuthState(auth);

    // items
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (loading) return;
        let data = {};
        if (localStorage.getItem('jwt') && user) {
            data.jwt = localStorage.getItem('jwt');
            data.uid = user.uid;
        }
        axios.post(`${URLS.serverRoot}${URLS.myItems}`, data, { headers: { 'content-type': 'application/json' } })
            .then(r => {
                console.log(r.data)
                if (!r.data?.ok) return toast.warn(`Error: ${r.data?.text}`, toastConfig);
                setItems(r.data.items);
            })
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig));
    }, [loading, user]);

    // fade in animation
    const animations = ['fromLeft', 'fromTop', 'fromRight', 'fromBottom'];

    return (
        <div className='site-mw mx-auto d-flex flex-column align-items-center'>
            <p className='text-center my-4'>Your items</p>
            <div className='items d-flex gap-3 mb-3 flex-wrap justify-content-center'>
                {
                    items.map(({ _id, name, image, description, quantity, price, supplier, sold }, index) => <Card style={{ width: '20rem' }} className={`item ` + animations[index % 4]} key={_id}>
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
                    </Card>)
                }
            </div>
        </div>
    );
};

export default MyItems;