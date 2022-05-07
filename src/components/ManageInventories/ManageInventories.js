import React from 'react';
import Items from '../Items/Items';

import './ManageInventories.css';

const ManageInventories = () => {
    return (
        <div>
            <Items from='inventories'></Items>
        </div>
    );
};

export default ManageInventories;