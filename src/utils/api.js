import { mockData } from "./mockData";
import axios from 'axios';
import NProgress from 'nprogress';

/*
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 */
export const extractLocations = (eventsList) => {
    var extractLocations = eventsList.map(e => e.location);
    return [...new Set(extractLocations)];
};

// nprogress --> is used to create and display progress bars at the top of the page
// getEvents return local mock data if req is from localhost
export const getEvents = async () => {
    //for navigator latency
    //NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
    NProgress.start();

    //if request is from localhost return local data
    if(window.location.href.startsWith("http://localhost")){
        NProgress.done();
        return mockData; 
    }

    //offline data fetching
    if(!navigator.onLine){
        const data = localStorage.getItem("lastEvents");
        NProgress.done();
        return data ? JSON.parse(data).events: [];
    }

    const token = await getAccessToken();

    if(token){
        removeQuery();
        const url = "https://9s8a8q7or0.execute-api.us-west-1.amazonaws.com/dev/api/get-events/"
                    + token;
        const result = await axios.get(url);
        if(result.data){
            var locations = extractLocations(result.data.events);
            localStorage.setItem("lastEvents", JSON.stringify(result.data));
            localStorage.setItem("locations", JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
};

// This function removes code from URL
// Check whether there’s a path, then build the URL with the current path (or build the URL without a path using window.history.pushState()).
const removeQuery = () => {
    var newUrl;

    if(window.history.pushState && window.location.pathname){
        newUrl =
            window.location.protocol
            + "//"
            + window.location.host
            + window.location.pathname;
        window.history.pushState("", "", newUrl);
    } else {
        newUrl =
            window.location.protocol
            + "//"
            + window.location.host;
        window.history.pushState("", "", newUrl);
    }
}


/* 
    1. No Access Token Found in localStorage, check whether authorized code is in url
    2. Access token found in storage and check whether authorized code is in url
*/
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if(!accessToken || !tokenCheck){
        await localStorage.removeItem("access_token");
        //if no access code found check for authorization code
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");

        if(!code){
            const results = await axios.get(
                "https://9s8a8q7or0.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
            );
            const { authURL } = results.data;
            console.log(authURL);
            return (window.location.href = authURL);
        }
        return code && getToken(code);
    }
    return accessToken;
};

//check for access token validity
export const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
    .then( res => res.json())
    .catch( error => error);
    
    return result;
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(
        "https://9s8a8q7or0.execute-api.us-west-1.amazonaws.com/dev/api/token/" +
        encodeCode
    )
    .then( res => res.json())
    .catch( error => error);
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};