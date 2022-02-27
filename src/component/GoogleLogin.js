import React from 'react';
import GoogleButton from 'react-google-button'

const GoogleLogin = ({getAccessToken}) => {
    return ( 
        <>
            <h1>
                Welcome to <br /><span className="title">MeetUp App</span>
            </h1>
            <h4>Log in to see upcoming, worldwide events for developers.</h4>
            <GoogleButton 
                className="google-btn"
                onClick={() => getAccessToken()}
            />
            <br />
            <a href="https://github.com/DeepthiSRao/meet-react-app" target="_blank" rel="noreferrer">Privacy Policy</a>
        </>
    );
}
 
export default GoogleLogin;