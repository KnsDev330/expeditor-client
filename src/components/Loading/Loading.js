import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
};

export default Loading;