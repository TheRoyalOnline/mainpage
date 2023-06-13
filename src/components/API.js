import Cookies from "universal-cookie";
import axios from "axios";

const URILogin = "https://royalonline.cloud/api/login";
const URISetNewUser = "https://royalonline.cloud/api/createuser"
const URIGetUser = "https://royalonline.cloud/api/user/"
const URIUpdateUser = "https://royalonline.cloud/api/user"
const URIrol = "https://royalonline.cloud/api/user/rol"
const URImail = "https://royalonline.cloud/api/sendmail"
const URIrecover = "https://royalonline.cloud/api/recover"
const URIFind = "https://royalonline.cloud/api/user/find"

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

    const res = await fetch(URISetNewUser, requestOptions);
    return res.text();
};

export const GetUserDetails = async (username) => {
    const token = new Cookies();
    const uri = URIGetUser + username;
    const body = {
        token: token.get("Authorization")
    }
    const res = await axios.post(uri, body, {
        headers: {
            "Content-Type": "application/json"
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
                token: token.get("Authorization"),
                iduser: user.iduser,
                password: user.password,
                name: user.name,
                surname: user.surname,
                email: user.email,
                phonecode: user.phonecode,
                phonenumber: user.phonenumber,
                email: user.email,
                active: user.active,
                changepass: user.changepass,
                district: user.district,
                city: user.city,
                street: user.street
            }
        )
    };

    const res = await fetch(URIUpdateUser, requestOptions);

    return res.status === 200;

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


export const GetRol = async () => {
    const token = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: token.get("Authorization"),
            username: token.get("username"),
        })
    };

    const res = await fetch(URIrol, requestOptions);

    return res.json();
};

export const SendMail = async (_subject, _message, mail, _token) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: _token,
            email: mail,
            subject: _subject,
            message: _message
        })
    };

    fetch(URImail, requestOptions);
};

export const RecoverPassword = async (user, mail) => {

    const randomPass = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    };

    const newPass = randomPass();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user,
            password: newPass,
            email: mail
        })
    };

    const res = await fetch(URIrecover, requestOptions);

    const data = await res.json();
    if (data['iduser'] != 0) {
        const message = "Hemos recibido tu peticion de reseteo de contraseña. Si no lo solicitaste favor comunicar esta informacion por este mismo canal.<br><hr><br>" +
            "<b>Usuario: </b>" + user +
            "<b><br>Contraseña: </b>" + newPass +
            "<br><br>No olvide cambiar su contraseña una vez accedido nuevamente a la aplicacion.<br><hr><br>" + "Gracias,<br>Equipo Casino Royal Online";
        SendMail("Cambio de contraseña", message, mail, "");
    }

};


export const FindUser = async (_dni) => {
    const token = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: token.get("Authorization"),
            dni: _dni,
        })
    };
    const res = await fetch(URIFind, requestOptions);

    return res.json();
};