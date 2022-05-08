import React from 'react';
import './About.css';
import containerImage from '../../images/container.jpg';

const About = () => {
    return (
        <div className='bg-white py-5'>
            <div className="site-mw mx-auto d-lg-flex align-items-center justify-content-center">
                <div className="about-image my-5">
                    <img src={containerImage} alt="" className="img-fluid" />
                </div>
                <div className="about-text my-3">
                    <h2>At Warehouse, we provide a unique solution for warehousing space for business and consumers</h2>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.<br /><br />There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                </div>
            </div>
        </div>
    );
};
export default About;