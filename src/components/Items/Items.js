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

    // readmore functionality
    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        return (<>
            {isReadMore ? text.slice(0, 120) : text}<span onClick={() => setIsReadMore(!isReadMore)} className='readmore'>{isReadMore ? "...  read more" : " show less"}</span>
        </>);
    };

    // fade in animation
    const animations = ['fromLeft', 'fromTop', 'fromRight', 'fromBottom'];

    return (
        <div className='site-mw mx-auto d-flex flex-column align-items-center'>
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
                            <Button as={Link} to={`/inventory/${_id}`} variant="outline-success" className='mt-auto w-50 mx-auto'>Manage</Button>
                        </Card.Body>
                    </Card>)
                }
            </div>

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