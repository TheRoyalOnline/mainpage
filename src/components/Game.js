import  Cookies  from "universal-cookie";

const URIConnectRoom = "https://royalonline.cloud/api/game/roomconnect";
const URIRoom = "https://royalonline.cloud/api/game/room";
const URIForce = "https://royalonline.cloud/api/game/force";
const URIRoomByID = "https://royalonline.cloud/api/game/editroom";
const URIForceAdmin = "https://royalonline.cloud/api/game/forceclose";
const URISetup = "https://royalonline.cloud/api/game/setup";
const URIStats = "https://slotpy.info/statistics";
const URIDetails = "https://slotpy.info/details";

export const ConnectRoom = async (_iduser, _idroom) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            iduser: _iduser,
            idroom: _idroom
        })
    };

    const res = await fetch(URIConnectRoom, requestOptions);
    return await res.status;
};

export const GetRoom = async (_idroom) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            idroom: _idroom
        })
    };

    const res = await fetch(URIRoom, requestOptions);
    return await res.json();
};

export const ForceDisconnect = async () => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            username: cookie.get('userdata').username
        })
    };

    const res = await fetch(URIForce, requestOptions);
    return await res.status;
};

export const RoomById = async (id) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            role: cookie.get('userdata').role,
            idroom: id
        })
    };
    const res = await fetch(URIRoomByID, requestOptions);
    return await res.json();
};

export const GamesSetup = async (idroom, setup) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            iduser: cookie.get('userdata').iduser,
            role: cookie.get('userdata').role,
            idroom: idroom,
            setup: JSON.stringify(setup)
        })
    };
    const res = await fetch(URISetup, requestOptions);
    return await res.status;
};

export const GetStatistics = async (id) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idroom: parseInt(id)
        })
    };
    const res = await fetch(URIStats, requestOptions);
    if(res.status === 200){
        return await res.json();
    }
    
};

export const GetDetails = async (id, since, until) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idroom: parseInt(id),
            since: since,
            until: until
        })
    };
    const res = await fetch(URIDetails, requestOptions);
    if(res.status === 200){
        return await res.json();
    }
    
};

export const ForceDisconnectAdmin = async (id) => {
    const cookie = new Cookies();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: cookie.get('userdata').token,
            idroom: parseInt(id),
            role: cookie.get('userdata').role
        })
    };

    const res = await fetch(URIForceAdmin, requestOptions);
    return await res.status;
};