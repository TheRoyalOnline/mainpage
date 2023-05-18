import Cookies from "universal-cookie";
import axios from "axios";
import { json } from "react-router-dom";

const URILogin = "https://royalonline.cloud/api/login";
const URISetNewUser = "https://royalonline.cloud/api/createuser"
const URIGetUser = "https://royalonline.cloud/api/user/"
const URIUpdateUser = "https://royalonline.cloud/api/user"

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
        cookies.set('Authorization', token);
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
    const uri = URIGetUser + username;
    const body = {
        token:token.get("Authorization")
    }
    const res = await axios.post(uri, body, {
        headers:{
            "Content-Type":"application/json"
        },
    });

    return res.data;

};


export const UpdateUserDetails = async user => {
    const token = new Cookies();
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                token:token.get("Authorization"),
                iduser:user.iduser,
                password:user.password,
                name:user.name,
                surname:user.surname,
                email:user.email,
                phonecode:user.phonecode,
                phonenumber:user.phonenumber,
                email:user.email,
                active:user.active,
                changepass:user.changepass,
                district:user.district,
                city:user.city,
                street:user.street
            }
        )
    };

    const res = await fetch(URIUpdateUser, requestOptions);

    return res.status===200;
    
};

export const TestPassword = async (user, pass) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    };

    const res = await fetch(URILogin, requestOptions);

    if (res.status === 200) {        
        return true;
    }

    return false;
};
