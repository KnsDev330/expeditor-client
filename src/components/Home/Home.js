import React from 'react';
import Items from '../Items/Items';

import backgroundImage from '../../images/bg.jpg';

import './Home.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Services from '../Services/Services';
import About from '../About/About';

const Home = () => {
    return (
        <div>
            <div className="wrapper">
                <header className='wrapper-header'>
                    <img src={backgroundImage} alt="Warehouse" className='background' />
                    <div className='d-flex flex-column align-items-center fromBottom position-relative home-texts'>
                        <h1 className='title'>Expeditor</h1>
                        <h3 className='text-white text-center fw-normal title-h3'>At Expeditor, we provide a unique solution for warehousing space for business and consumers</h3>
                        <Button variant='success' as={Link} to='/manage-inventories' className='mt-4'>
                            Inventories <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    </div>
                </header>
            </div>
            <Items from='home' ></Items>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;