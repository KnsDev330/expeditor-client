import React, { useState } from 'react';
import './ReadMore.css';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    return (<>
        {isReadMore ? text?.slice(0, 120) : text}
        <span onClick={() => setIsReadMore(!isReadMore)} className='readmore'>{isReadMore ? (text?.length > 120 && "...  read more") : " show less"}</span>
    </>);
};

export default ReadMore;