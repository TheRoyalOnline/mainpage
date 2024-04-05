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
const URIAssign = "https://royalonline.cloud/api/user/assign"
const URICredits = "https://royalonline.cloud/api/user/credits"
const URITransact = "https://royalonline.cloud/api/user/transact"
const URICreate = "https://royalonline.cloud/api/user/createconomy"
const URITransactions = "https://royalonline.cloud/api/user/transactions"
const URIUpdateAdmin = "https://royalonline.cloud/api/user/adminupdate"
const URIList = "https://royalonline.cloud/api/user/list"
const URIRequests = "https://royalonline.cloud/api/user/requests"
const URIResponse = "https://royalonline.cloud/api/user/response"
const URICommission = "https://royalonline.cloud/api/user/commissions"
const URICommissionAud = "https://royalonline.cloud/api/user/commissions_aud"

export const Logon = async (user, pass) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    };

    const res = await fetch(URILogin, requestOptions);
    if (res.status === 200) {
        const cookies = new Cookies();
        var token = await res.text();
        var userdata = {
            token: token
        }
        cookies.set('userdata', userdata);
        const data = await GetUserDetails(user.trim());

        userdata = {
            iduser: data.id,
            username: data.username,
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role,
            rolename: data.rolename,
            token: token
        }
        cookies.set('userdata', userdata);
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
    return { "token": res.text(), "status": res.status};
};

export const GetUserDetails = async (username) => {
    const cookie = new Cookies();
    const uri = URIGetUser + username;
    const body = {
        token: cookie.get('userdata').token
    }
    const res = await axios.post(uri, body, {
        headers: {
            "Content-Type": "application/json"
        },
    });

    return res.data;
};


export const UpdateUserDetails = async user => {
    const cookie = new Cookies();

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                token: cookie.get('userdata').token,
                iduser: user.iduser,
                password: user.password,
                name: user.name,
                surname: user.surname,
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
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            username: cookie.get('userdata').username,
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
            "<br><br>No olvide cambiar su contraseña una vez accedido nuevamente a la aplicacion.<br><hr><br>" + "Gracias,<br>Equipo Tio Mono";
        SendMail("Cambio de contraseña", message, mail, "");
    }

};


export const FindUser = async (_dni) => {

    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            dni: _dni,
        })
    };
    const res = await fetch(URIFind, requestOptions);
    return res.json();

};

export const GetUserCredits = async (_iduser) => {
    const cookie = new Cookies();
    const body = {
        token: cookie.get('userdata').token,
        iduser: _iduser
    }
    const res = await axios.post(URICredits, body, {
        headers: {
            "Content-Type": "application/json"
        },
    });

    return res.data;

};



export const AssignToUser = async (data) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            from: data.from,
            for: data.for,
            credits: data.credits,
            cash: data.cash
        })
    };
    const res = await fetch(URIAssign, requestOptions);
    return await res.status;
};

export const TransactToUser = async (data) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            from: data.from,
            for: data.for,
            credits: data.credits,
            cash: data.cash,
            type: data.type
        })
    };

    const res = await fetch(URITransact, requestOptions);

    if (res.status === 200) {
        if (data.role === 5) {
            const message = data.type === "buy" ?
                `Venta de creditos registrada correctamente.<br>Creditos vendidos: ${data.credits}<br><hr><br>Gracias,<br>Equipo Tio Mono` :
                `Has recibido creditos.<br>Creditos comprados: ${data.credits}<br><hr><br>Gracias,<br>Equipo Tio Mono`;
            SendMail("Transaccion realizada", message, data.email, "");
        }
    }
    return await res.status;
};


export const CreateEconomy = async (data) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            from: data.from,
            credits: data.credits,
            cash: data.cash,
            code: data.code
        })
    };
    const res = await fetch(URICreate, requestOptions);
    return await res.status;
};

export const MovementsList = async (iduser) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            iduser: iduser
        })
    };
    const res = await fetch(URITransactions, requestOptions);
    return await res.json();
};


export const UpdateByAdmin = async (user, password) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            rolefrom: cookie.get('userdata').role,
            iduser: user.iduser,
            firstname: user.firstname,
            surname: user.surname,
            dni: user.dni,
            active: user.active,
            password: password,
            email: user.email,
            idrole: user.role,
            commission_earn: user.commission_earn,
            commission_lose: user.commission_lose
        })
    };

    const res = await fetch(URIUpdateAdmin, requestOptions);

    if (res.status === 200) {
        return true;
    }

    return false;
};


export const GetRequests = async () => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            rolefrom: cookie.get('userdata').role,
            iduser: cookie.get('userdata').iduser
        })
    };

    const res = await fetch(URIRequests, requestOptions);

    if (res.status === 200) {
        return await res.json();
    }
};


export const Response = async (id, state) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            idrequest: id,
            state: state
        })
    };

    const res = await fetch(URIResponse, requestOptions);

    return await res.status;
};


export const UsersList = async () => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            idrole: cookie.get('userdata').role
        })
    };

    const res = await fetch(URIList, requestOptions);
    return await res.json();
};

export const UserCommission = async (iduser, since, until) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            idseller: iduser,
            since: since,
            until: until
        })
    };

    const res = await fetch(URICommission, requestOptions);
    return await res.json();
};


export const UserCommissionAud = async (iduser, since, until, amount) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            iduser: iduser,
            createdby: cookie.get('userdata').iduser,
            date_since: since,
            date_until: until,
            amount: amount
        })
    };
    const res = await fetch(URICommissionAud, requestOptions);
    return await res.status;
};
