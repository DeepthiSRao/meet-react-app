import React from 'react';
import GoogleButton from 'react-google-button'
import { getAccessToken } from '../utils/api';

const GoogleLogin = () => {
    return ( 
        <div>
            <GoogleButton 
                onClick={() => getAccessToken()}
            />
        </div>
    );
}
 
export default GoogleLogin;