import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';
import { auth } from '../../firebase.init';

import './Inventory.css';

// toast config
const toastConfig = { position: "top-right", autoClose: 2000 };

const Inventory = () => {
    const { id } = useParams();

    // current firebase user
    const [user, loading] = useAuthState(auth);

    // item details
    const [item, setItem] = useState({});
    useEffect(() => {
        if (loading) return;
        let data = { id };
        if (localStorage.getItem('jwt') && user) {
            data.jwt = localStorage.getItem('jwt');
            data.uid = user.uid;
        }
        axios.post(`${URLS.serverRoot}${URLS.getItem}`, data, { headers: { 'content-type': 'application/json' } })
            .then(r => setItem(r.data))
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig));
    }, [id, user, loading]);

    // destructure item details
    const { _id, name, image, description, quantity, price, supplier, sold } = item;

    return (
        <div className='d-flex justify-content-center my-4'>
            <Card style={{ width: '20rem' }} className={`item`} key={_id}>
                <Card.Img variant="top" src={`https://knsdev330-a3.netlify.app/src/images/` + image} />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className='mb-1'><span className='w-70px'>Price:</span> <span style={{ fontWeight: '500' }}>{Number(price).toLocaleString()} BDT</span></Card.Text>
                    <Card.Text className='mb-1'><span className='w-70px'>Quantity:</span> <span style={{ fontWeight: '500' }}>{Number(quantity).toLocaleString()}</span></Card.Text>
                    <Card.Text className='mb-1'><span className='w-70px'>Supplier:</span> <span style={{ fontWeight: '500' }}>{supplier}</span></Card.Text>
                    <Card.Text className='my-2 description'>{description}</Card.Text>
                    <Button variant="outline-success" className='mt-auto w-50 mx-auto'>Manage</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Inventory;