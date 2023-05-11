import Cookies from "universal-cookie";

const URILogin = "https://royalonline.cloud/api/login";
const URISetNewUser = "https://royalonline.cloud/api/createuser"
const URIGetUser = "https://royalonline.cloud/api/user/"

export const GetUser = async (user, pass) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    };

    const res = await fetch(URILogin, requestOptions);

    if (res.status === 200) {
        const cookies = new Cookies();
        var token = await res.text();
        cookies.set('token', token);
        cookies.set('username', user);
        cookies.set('isLogged', true);
        return true;
    }

    return false;
};

export const SetNewUser = async (formData) => {
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch(URISetNewUser, requestOptions).then(
        res => {
            return res.status === 200;
        }
    );
};

export const GetUserDetails = async (username) => {
    const token = new Cookies();
    const requestOptions = {        
        method: 'GET',
        headers: { 'token': token.get('token')}
    };
    const headers = new Headers(window?.headers);
    console.log(headers['token']);
    const uri = URIGetUser + username;
    const res = await fetch(uri, requestOptions);
    return res.json();

};
