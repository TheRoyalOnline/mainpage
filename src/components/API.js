import Cookies from "universal-cookie";

const URI = "http://127.0.0.1:5000/api/login";
const URI_Retrieve = "http://127.0.0.1:5000/api/user/darrua"

export const GetUser = async (user, pass) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    };
    
    const res = await fetch(URI, requestOptions);
    
    if(res.status == 200)
    {
        const cookies = new Cookies();
        var token = await res.text();
        cookies.set('token', token);
        cookies.set('username', user);
        cookies.set('isLogged', true);
        console.log(cookies.get('token'));
        return true;
    }

    return false;
};