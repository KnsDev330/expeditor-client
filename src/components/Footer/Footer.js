import React from 'react';
import './Footer.css';

import facebookSvg from '../../images/social/facebook.svg';
import gitHubSvg from '../../images/social/github.svg';
import instagramSvg from '../../images/social/instagram.svg';
import telegramSvg from '../../images/social/telegram.svg';
import twitterSvg from '../../images/social/twitter.svg';

import appstoreSvg from '../../images/appstore.png';
import playstoreSvg from '../../images/playstore.png';

const Footer = () => {
    return (
        <footer className='mt-auto'>
            <div className="site-mw mx-auto d-flex flex-lg-row flex-column justify-content-around align-items-center mt-auto pb-5 py-lg-5">
                <div className="followmeon text-white my-5">
                    <div className='text-center mb-3'><small>Find us on:</small></div>
                    <div className="socials d-flex flex-wrap gap-1 justify-content-center">
                        <div className="social"><a href='https://www.facebook.com/khandaker330' target="_blank" rel="noreferrer"><img src={facebookSvg} alt="" /></a></div>
                        <div className="social"><a href='https://github.com/KnsDev330' target="_blank" rel="noreferrer"><img src={gitHubSvg} alt="" /></a></div>
                        <div className="social"><a href='https://www.instagram.com/KnsDev330' target="_blank" rel="noreferrer"><img src={instagramSvg} alt="" /></a></div>
                        <div className="social"><a href='https://t.me/KnsDev330' target="_blank" rel="noreferrer"><img src={telegramSvg} alt="" /></a></div>
                        <div className="social"><a href='https://twitter.com/KnsDev' target="_blank" rel="noreferrer"><img src={twitterSvg} alt="" /></a></div>
                    </div>
                </div>
                <div className="copyright text-white mt-lg-0 mt-5">
                    <p className='text-center m-0'>Copyright &copy; 2022, All Rights Reserved</p>
                </div>
                <div className="gettheapp text-white d-flex flex-column align-items-center gap-2">
                    <p className='text-center m-0'>Get The App</p>
                    <div><a href='https://play.google.com/store/apps/details?id=com.tencent.ig' target="_blank" rel="noreferrer"><img src={playstoreSvg} alt="" /></a></div>
                    <div><a href='https://apps.apple.com/us/app/pubg-mobile/id1330123889' target="_blank" rel="noreferrer"><img src={appstoreSvg} alt="" /></a></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;