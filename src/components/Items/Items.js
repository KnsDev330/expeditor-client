import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';
import { auth } from '../../firebase.init';
import './Items.css';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faTrash, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const toastConfig = { position: "top-right", autoClose: 2000 };

const Items = ({ home }) => {
    // page counts
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    // current firebase user
    const [user, loading] = useAuthState(auth);

    // items
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (loading) return;
        let data = { page, limit: home ? 6 : limit };
        if (localStorage.getItem('jwt') && user) {
            data.jwt = localStorage.getItem('jwt');
            data.uid = user.uid;
        }
        axios.post(`${URLS.serverRoot}${URLS.getItems}`, data, { headers: { 'content-type': 'application/json' } })
            .then(r => setItems(r.data))
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig));
    }, [user, page, limit, home, loading]);

    // page count
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        if (loading) return;
        let data = { page, limit: home ? 6 : limit }
        if (localStorage.getItem('jwt') && user) {
            data.jwt = localStorage.getItem('jwt');
            data.uid = user.uid;
        }
        axios.post(`${URLS.serverRoot}${URLS.getItemsCount}`, data, { headers: { 'content-type': 'application/json' } })
            .then(r => setPageCount(Math.ceil(r.data.count / limit)))
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig));
    }, [home, limit, loading, page, user]);

    // fade in animation
    const animations = ['fromLeft', 'fromTop', 'fromRight', 'fromBottom'];

    // delete item confirmation
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleting, setDeleting] = useState(false);
    const DeleteItem = () => {
        setDeleting(true);
        let data = { id: deleteId };
        if (localStorage.getItem('jwt') && user) {
            data.jwt = localStorage.getItem('jwt');
            data.uid = user.uid;
        }
        axios.post(`${URLS.serverRoot}${URLS.deleteItem}`, data, { headers: { 'content-type': 'application/json' } })
            .then(r => {
                console.log(r.data)
                if (!r.data?.ok) return toast.error(`Error: ${r.data?.text}`, toastConfig);
                setItems(items.filter(item => item._id !== deleteId));
                setDeleteId('');
                toast.success(`Success: ${r.data?.text}`, toastConfig);
            })
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig))
            .finally(() => { setShowModal(false); setDeleting(false); });
    }

    return (
        <div className='site-mw mx-auto d-flex flex-column align-items-center'>

            {!home && <Button as={Link} to={`/add-item`} className='mt-5 mb-3'> Add New Item </Button>}

            <h2 className='text-center my-4'>Items we manage</h2>
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
                            <div className="mt-auto d-flex justify-content-between">
                                <Button variant="outline-danger" className='mt-auto w-25 mx-auto' onClick={() => { setShowModal(true); setDeleteId(_id); }}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </Button>
                                <Button as={Link} to={`/inventory/${_id}`} variant="outline-success" className='mt-auto w-50 mx-auto'>Manage</Button>
                            </div>
                        </Card.Body>
                    </Card>)
                }
            </div>

            {/* Confirm Delete */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showModal}>
                <Modal.Body className='d-flex flex-column align-items-center'>
                    <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: '#ff6a6a', fontSize: '100px' }} />
                    <h4>Confirm Delete</h4>
                    <p>
                        Please confirm if you really want to delete the item with id: <strong>{deleteId}</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={DeleteItem} variant='danger' disabled={deleting}>
                        {deleting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete'}
                    </Button>
                    <Button onClick={() => setShowModal(false)} variant='success'>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {home && <Button as={Link} to={`/manage-inventories`} className='mb-5 mt-3'> Manage Inventories </Button>}

            {
                !home && <>
                    <div className='d-lg-flex justify-content-around w-100 mt-3 mb-5'>
                        <div className='col-lg-6 col-12 justify-content-center my-3 d-flex gap-2 flex-wrap'>
                            {
                                [...Array(pageCount).keys()].map(
                                    num => <Button variant={page === num ? 'primary' : 'outline-primary'} onClick={() => setPage(num)} key={num} >{num + 1}</Button>
                                )
                            }
                        </div>
                        <div className='col-lg-6 col-12 d-flex justify-content-center align-items-center my-3'>
                            <p className='m-0 text-nowrap'>Items per page: &nbsp;</p>
                            <select className='item-size' onChange={e => { setLimit(Number(e.target.value)); setPage(0); }}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Items;