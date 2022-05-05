import React from 'react';
import Items from '../Items/Items';

import './Home.css';

const Home = () => {
    return (
        <div>

            <Items home={true} ></Items>

        </div>
    );
};

export default Home;