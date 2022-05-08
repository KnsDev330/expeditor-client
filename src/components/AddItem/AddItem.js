import axios from 'axios';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';
import { auth } from '../../firebase.init';

import './AddItem.css';

// toast config
const toastConfig = { position: "top-right", autoClose: 2000 };

const AddItem = () => {
    const [user] = useAuthState(auth);

    /************* LOAD DUMMY FORM DATA *************/
    const [dummy, setDummy] = useState({});
    const LoadDummyData = () => {
        axios.get('/data/dummyAddItemData.json')
            .then(r => setDummy(r.data[Math.floor(Math.random() * 12)]))
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig))
    }

    // handle add new item
    const [adding, setAdding] = useState(false);
    const AddNewItem = async e => {

        // prevent page reload
        e.preventDefault();
        setAdding(true);

        // construct item object
        const item = {
            name: e.target.name.value,
            price: Number(e.target.price.value),
            quantity: Number(e.target.quantity.value),
            sold: Number(e.target.sold.value),
            supplier: e.target.supplier.value,
            image: e.target.image.value,
            description: e.target.description.value
        }
        const data = { uid: user.uid, jwt: localStorage.getItem("jwt"), item };

        // clear form
        e.target.name.value = '';
        e.target.price.value = '';
        e.target.quantity.value = '';
        e.target.sold.value = '';
        e.target.supplier.value = '';
        e.target.image.value = '';
        e.target.description.value = '';

        // request to server
        axios.post(`${URLS.serverRoot}${URLS.addItem}`, data, { headers: { 'content-type': 'application/json' } })
            .then(res => {
                if (!res.data?.ok) return toast.error(`Error: ${res.data?.text}`, toastConfig);
                toast.success(`Success: item added`, toastConfig);
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text}`, toastConfig))
            .finally(() => setAdding(false)); // reset adding to false
    }
    return (
        <div className='d-flex flex-column align-items-center my-5'>
            <p>Add New Item</p>
            <div className='add-new-item-form p-5 fromBottom position-relative'>
                <form action="#" onSubmit={AddNewItem} className='d-flex flex-column'>
                    <div>
                        <label htmlFor="name" className='text-label'>Name:</label>
                        <input type="text" className='form-control' id='name' name='name' required defaultValue={dummy.name || ''} />

                        <label htmlFor="price" className='text-label mt-3'>Price:</label>
                        <input type="number" className='form-control' id='price' name='price' required defaultValue={dummy.price || ''} />

                        <label htmlFor="quantity" className='text-label mt-3'>Quantity:</label>
                        <input type="number" className='form-control' id='quantity' name='quantity' required defaultValue={dummy.quantity || ''} />

                        <label htmlFor="sold" className='text-label mt-3'>Sold:</label>
                        <input type="number" className='form-control' id='sold' name='sold' required defaultValue={dummy.sold || ''} />

                        <label htmlFor="supplier" className='text-label mt-3'>Supplier:</label>
                        <input type="text" className='form-control' id='supplier' name='supplier' required defaultValue={dummy.supplier || ''} />

                        <label htmlFor="image" className='text-label mt-3'>Image url:</label>
                        <input type="text" className='form-control' id='image' name='image' required defaultValue={dummy.image || ''} />

                        <label htmlFor="description" className='text-label mt-3'>Description:</label>
                        <textarea type="text" className='form-control' id='description' name='description' required defaultValue={dummy.description || ''} />
                    </div>
                    <Button variant="success" className='mt-3 w-50 mx-auto' type='submit' disabled={adding || ''}>
                        {adding ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Add'}
                    </Button>
                    <Button variant="secondary" className='mt-3 w-50 mx-auto' onClick={LoadDummyData}>
                        Load Dummy Data
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;