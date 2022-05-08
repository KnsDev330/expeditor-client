import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Services.css';

import service1 from '../../images/ser-1.jpg';
import service2 from '../../images/ser-2.jpg';
import service3 from '../../images/ser-3.jpg';
import service4 from '../../images/ser-4.jpg';

const Services = () => {
    return (
        <div className='site-mw mx-auto py-5 services-section position-relative fromTop'>
            <h2 className='text-center services-header'>
                Services<br />
                <strong>We Provide</strong>
            </h2>
            <p className='my-5 text-center'>Through our experienced operations team we can handle various kind of supply chain operations and services</p>

            <div className="services d-flex flex-wrap justify-content-center gap-3">
                <Card style={{ width: '20rem' }} className='service fromTop'>
                    <Card.Img variant="top" src={service1} />
                    <Card.Body className='d-flex flex-column'>
                        <h5 className='text-black-50 text-center my-2'>On-Demand Warehousing Space Services</h5>
                        <div className="mt-auto d-flex justify-content-center gap-2">
                            <Button variant="success" className='mt-auto w-50'>Read More</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem' }} className='service fromBottom'>
                    <Card.Img variant="top" src={service2} />
                    <Card.Body className='d-flex flex-column'>
                        <h5 className='text-black-50 text-center my-2'>Kitting, Packing and Other Customized Operation</h5>
                        <div className="mt-auto d-flex justify-content-center gap-2">
                            <Button variant="success" className='mt-auto w-50'>Read More</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem' }} className='service fromLeft'>
                    <Card.Img variant="top" src={service3} />
                    <Card.Body className='d-flex flex-column'>
                        <h5 className='text-black-50 text-center my-2'>Value Added Services</h5>
                        <div className="mt-auto d-flex justify-content-center gap-2">
                            <Button variant="success" className='mt-auto w-50'>Read More</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem' }} className='service fromRight'>
                    <Card.Img variant="top" src={service4} />
                    <Card.Body className='d-flex flex-column'>
                        <h5 className='text-black-50 text-center my-2'>Distribution and Reverse Logistics</h5>
                        <div className="mt-auto d-flex justify-content-center gap-2">
                            <Button variant="success" className='mt-auto w-50'>Read More</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </div >
    );
};

export default Services;