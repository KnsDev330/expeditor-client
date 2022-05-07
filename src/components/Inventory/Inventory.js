import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';
import { auth } from '../../firebase.init';
import ReadMore from '../ReadMore/ReadMore';

import './Inventory.css';

// toast config
const toastConfig = { position: "top-right", autoClose: 2000 };

const Inventory = () => {

    const { id } = useParams();
    const [user, loading] = useAuthState(auth);

    // item details
    const [reload, setReload] = useState(0);
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
    }, [id, user, loading, reload]);

    // handle item delivery / restocking
    const [delivering, setDelivering] = useState(false);
    const HandleDelivery = async e => {
        // prevent page reload
        e.preventDefault();

        setDelivering(true);
        let data = e.target?.count?.value ?
            { id, uid: user.uid, jwt: localStorage.getItem("jwt"), restock: e.target.count.value } : { id, uid: user.uid, jwt: localStorage.getItem("jwt") };

        // clear restock form if updating
        if (data.restock) e.target.count.value = '';

        // request to server
        axios.post(`${URLS.serverRoot}${URLS.updateItem}`, data, { headers: { 'content-type': 'application/json' } })
            .then(r => {
                if (!r.data?.ok) return toast.error(`Error: ${r.data?.text}`, toastConfig);
                setReload(reload + 1);
                toast.success(`${data.restock ? 'Restocked' : 'Delivered'} successfully`, toastConfig);
            })
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig))
            .finally(() => setDelivering(false)); // reset delivering to false
    }


    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center my-4 gap-3 flex-wrap'>
                <Card style={{ width: '30rem', maxWidth: '90%' }} className={`item`}>
                    <Card.Img variant="top" src={`https://knsdev330-a3.netlify.app/src/images/` + item.image} />
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text className='mb-1'>
                            <span className='w-70px'>ID:</span> <span style={{ fontWeight: '500' }} title={item._id}>{`${item._id?.slice(0, 7)}...${item._id?.slice(-7)}`}</span>
                        </Card.Text>
                        <Card.Text className='mb-1'><span className='w-70px'>Price:</span> <span style={{ fontWeight: '500' }}>{Number(item.price).toLocaleString()} BDT</span></Card.Text>
                        <Card.Text className='mb-1'><span className='w-70px'>Quantity:</span> <span style={{ fontWeight: '500' }}>{Number(item.quantity).toLocaleString()}</span></Card.Text>
                        <Card.Text className='mb-1'><span className='w-70px'>Sold:</span> <span style={{ fontWeight: '500' }}>{Number(item.sold).toLocaleString()}</span></Card.Text>
                        <Card.Text className='mb-1'><span className='w-70px'>Supplier:</span> <span style={{ fontWeight: '500' }}>{item.supplier}</span></Card.Text>
                        <Card.Text className='my-2 description'><ReadMore>{item.description}</ReadMore></Card.Text>
                        <Button variant="success" className='mt-auto w-50 mx-auto' onClick={HandleDelivery} disabled={delivering}>
                            {delivering ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delivered'}
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '30rem', maxWidth: '90%' }} className={`item`}>
                    <Card.Img variant="top" src={`https://knsdev330-a3.netlify.app/src/images/` + item.image} />
                    <Card.Body>
                        <Card.Title className='text-center'>Restock Item</Card.Title>
                        <Card.Title className='text-center'>{item.name}</Card.Title>
                        <form action='#' className='d-flex flex-column justify-content-center' onSubmit={HandleDelivery}>
                            <label htmlFor="count" className='text-label mt-3'>Item Count:</label>
                            <input type="number" className='form-control mx-auto' id='count' name='count' placeholder='Item Quantity to add' pattern="[0-9]*" required />
                            <Button variant="success" className='mt-3 w-50 mx-auto' type='submit'>
                                {delivering ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Update'}
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
            <Button as={Link} to={`/manage-inventories`} className='mb-5 mt-3'> Manage Inventories </Button>
        </div>
    );
};

export default Inventory;