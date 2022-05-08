import { faCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/CONSTS';

import './Blogs.css';
const toastConfig = { position: "top-right", autoClose: 2000 };

const Blogs = () => {

    // load blogs from server
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.post(`${URLS.serverRoot}${URLS.getBlogs}`, {}, { headers: { 'content-type': 'application/json' } })
            .then(r => setBlogs(r.data.blogs || []))
            .catch(err => toast.error(`Error: ${err.message}`, toastConfig));
    }, []);

    // fade in animation
    const animations = ['fromLeft', 'fromTop', 'fromRight', 'fromBottom'];

    return (
        <div className='mx-auto site-mw my-5'>
            <div className="blogs d-flex gap-4 justify-content-center flex-wrap">
                {
                    blogs.map((blog, index) => <div className={`blog p-3 ` + animations[index % 4]} key={blog._id}>
                        <h4 className='d-flex'>
                            <FontAwesomeIcon icon={faQuestionCircle} className='me-2' />
                            {blog.question}
                        </h4>
                        {
                            blog.ans.map(
                                a => <div className='d-flex' style={{ color: '#505050' }} key={Math.ceil(Math.random() * 99999999)}>
                                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '4px', margin: '9px 10px 0 0', display: 'inline' }} />
                                    <p className='mb-2' dangerouslySetInnerHTML={{ __html: a }}></p>
                                </div>
                            )
                        }
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blogs;