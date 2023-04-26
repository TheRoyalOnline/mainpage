import Cookies from "universal-cookie";

const URILogin = "http://royalonline.cloud/api/login";
const URISetNewUser = "http://royalonline.cloud/api/createuser"

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
        console.log(cookies.get('token'));
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
