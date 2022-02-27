import React from 'react';
import GoogleButton from 'react-google-button'
import app_logo from '../images/app_logo.png';

const GoogleLogin = ({getAccessToken}) => {
    return ( 
        <div className='login-page'>
            <img src={app_logo} alt='login_img' className='logo' />
            <p>Connecting Developers World Wide</p>
            <GoogleButton 
                className='google-btn'
                onClick={getAccessToken}
            />
            <br />
            <a href="https://github.com/DeepthiSRao/meet-react-app" target="_blank" rel="noreferrer">Privacy Policy</a>
        </div>
    );
}
 
export default GoogleLogin;